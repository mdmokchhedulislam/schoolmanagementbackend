const mongoose = require('mongoose');

const markSchema = new mongoose.Schema({
  schoolId: { type: mongoose.Schema.Types.ObjectId, ref: 'School', required: true },
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  examId: { type: mongoose.Schema.Types.ObjectId, ref: 'Exam', required: true },
  subjectName: { type: String, required: true }, // e.g., 'Mathematics'
  theoryMarks: { type: Number, default: 0 },
  practicalMarks: { type: Number, default: 0 },
  totalMarks: { type: Number, required: true },
  grade: String, // e.g., 'A+'
  point: Number  // e.g., 5.00
}, { timestamps: true });

// নিশ্চিত করা যে এক স্টুডেন্টের এক পরীক্ষায় এক সাবজেক্টে একটাই এন্ট্রি থাকবে
markSchema.index({ studentId: 1, examId: 1, subjectName: 1 }, { unique: true });

module.exports = mongoose.model('Mark', markSchema);