const mongoose = require('mongoose');

const schoolSchema = new mongoose.Schema({
  name: { type: String, required: true },
  subdomain: { type: String, unique: true, required: true },
  subscription: {
    plan: { type: String, enum: ['basic', 'premium'], default: 'basic' },
    status: { type: String, enum: ['active', 'expired'], default: 'active' },
    expiryDate: Date
  },
  address: String,
  contactEmail: { type: String, unique: true, required: true }
}, { timestamps: true });

module.exports = mongoose.model('School', schoolSchema);