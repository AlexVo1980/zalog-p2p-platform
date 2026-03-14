const express = require('express');
const { auth, requireRole } = require('../middleware/auth');
const User = require('../models/User');

const router = express.Router();

// Get all users (admin only)
router.get('/', auth, requireRole('admin'), async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update user
router.patch('/:id', auth, async (req, res) => {
  try {
    if (req.user._id.toString() !== req.params.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden' });
    }

    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

