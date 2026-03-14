const express = require('express');
const { body, validationResult } = require('express-validator');
const Application = require('../models/Application');
const { auth, requireRole } = require('../middleware/auth');

const { spawn } = require('child_process');
const path = require('path');

const router = express.Router();

// AI Analysis of application
router.post('/:id/analyze', auth, async (req, res) => {
  try {
    const application = await Application.findById(req.params.id)
      .populate('borrower', 'firstName lastName email phone');

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    // Подготовка данных для Python
    const loanData = {
      amount: application.amount,
      collateral_type: application.type,
      collateral_description: application.description,
      collateral_value: application.amount * 1.5, // Временная заглушка, если нет поля в БД
      term_months: application.term,
      income: 150000 // Временная заглушка
    };

    const pythonProcess = spawn('python3', [
      path.join(__dirname, '../../analyze_loan.py'),
      JSON.stringify(loanData)
    ]);

    let result = '';
    let error = '';

    pythonProcess.stdout.on('data', (data) => {
      result += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
      error += data.toString();
    });

    pythonProcess.on('close', async (code) => {
      if (code !== 0) {
        console.error(`AI analysis failed with code ${code}: ${error}`);
        return res.status(500).json({ message: 'AI Analysis failed', error });
      }

      // Сохраняем анализ в заявку (опционально)
      application.aiAnalysis = result;
      application.updatedAt = new Date();
      await application.save();

      res.json({ analysis: result });
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all applications
router.get('/', auth, async (req, res) => {
  try {
    const { status, type, region } = req.query;
    const filter = {};

    // Если пользователь не админ, показываем только его заявки
    if (req.user.role !== 'admin') {
      filter.borrower = req.user._id;
    }

    if (status) filter.status = status;
    if (type) filter.type = type;
    if (region) filter.region = region;

    const applications = await Application.find(filter)
      .populate('borrower', 'firstName lastName email')
      .populate('broker', 'firstName lastName')
      .sort({ createdAt: -1 });

    res.json(applications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get application by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const application = await Application.findById(req.params.id)
      .populate('borrower', 'firstName lastName email phone')
      .populate('broker', 'firstName lastName');

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    res.json(application);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create application
router.post(
  '/',
  auth,
  [
    body('type').isIn(['real_estate', 'car', 'equipment']),
    body('amount').isNumeric().isInt({ min: 100000 }),
    body('term').isNumeric().isInt({ min: 1, max: 60 }),
    body('description').notEmpty(),
    body('region').notEmpty(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const application = new Application({
        ...req.body,
        borrower: req.user._id,
      });

      await application.save();
      await application.populate('borrower', 'firstName lastName email');

      res.status(201).json(application);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// Update application status
router.patch(
  '/:id/status',
  auth,
  requireRole('admin'),
  [body('status').isIn(['pending', 'approved', 'rejected', 'funded', 'completed'])],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const application = await Application.findByIdAndUpdate(
        req.params.id,
        { status: req.body.status, updatedAt: new Date() },
        { new: true }
      );

      if (!application) {
        return res.status(404).json({ message: 'Application not found' });
      }

      res.json(application);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

module.exports = router;

