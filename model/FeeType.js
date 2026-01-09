const mongoose = require('mongoose');

const feeTypeSchema = new mongoose.Schema({
  schoolId: { type: mongoose.Schema.Types.ObjectId, ref: 'School', required: true },
  name: { type: String, required: true }, 
  amount: { type: Number, required: true },
  studentClass: { type: String, required: true } 
}, { timestamps: true });

module.exports = mongoose.model('FeeType', feeTypeSchema);