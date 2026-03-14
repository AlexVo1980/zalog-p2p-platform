const express = require('express');
const { auth } = require('../middleware/auth');
const Application = require('../models/Application');

const router = express.Router();

// Get user's collaterals
router.get('/my', auth, async (req, res) => {
  try {
    const collaterals = await Application.find({ borrower: req.user._id })
      .sort({ createdAt: -1 });

    res.json(collaterals);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

