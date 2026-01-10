import mongoose from 'mongoose';

const enrollmentSchema = new mongoose.Schema({
  schoolId: { type: mongoose.Schema.Types.ObjectId, ref: 'School', required: true },
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  classId: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true },
  academicYear: { type: mongoose.Schema.Types.ObjectId, ref: 'AcademicYear', required: true },
  section: { type: String, required: true },
  rollNo: { type: Number, required: true },
  status: { type: String, enum: ['active', 'promoted', 'failed'], default: 'active' }
}, { timestamps: true });

export default mongoose.model('Enrollment', enrollmentSchema);