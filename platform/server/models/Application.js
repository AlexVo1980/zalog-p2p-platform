const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  borrower: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  broker: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  type: {
    type: String,
    enum: ['real_estate', 'car', 'equipment'],
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  ltv: {
    type: Number,
    default: 70,
  },
  rate: {
    type: Number,
    default: 18,
  },
  term: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'funded', 'completed'],
    default: 'pending',
  },
  description: {
    type: String,
    required: true,
  },
  region: {
    type: String,
    required: true,
  },
  documents: [{
    type: String,
  }],
  approvalProbability: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Application', applicationSchema);

