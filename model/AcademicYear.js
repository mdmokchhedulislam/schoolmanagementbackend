import mongoose from 'mongoose';

const academicYearSchema = new mongoose.Schema({
  schoolId: { type: mongoose.Schema.Types.ObjectId, ref: 'School', required: true },
  year: { type: String, required: true }, 
  isCurrent: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model('AcademicYear', academicYearSchema);