import mongoose from "mongoose";

const markSchema = new mongoose.Schema({
  schoolId: { type: mongoose.Schema.Types.ObjectId, ref: 'School', required: true },
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  examId: { type: mongoose.Schema.Types.ObjectId, ref: 'Exam', required: true },
  subjectName: { type: String, required: true }, 
  theoryMarks: { type: Number, default: 0 },
  practicalMarks: { type: Number, default: 0 },
  totalMarks: { type: Number, required: true },
  grade: String, 
  point: Number  
}, { timestamps: true });


markSchema.index({ studentId: 1, examId: 1, subjectName: 1 }, { unique: true });

export default mongoose.model('Mark', markSchema);