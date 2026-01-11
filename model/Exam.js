import mongoose from "mongoose";

const examSchema = new mongoose.Schema({
  schoolId: { type: mongoose.Schema.Types.ObjectId, ref: 'School', required: true },
  examName: { type: String, required: true }, 
  session: { type: String, required: true },  
  startDate: Date,
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model('Exam', examSchema);