
import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  schoolId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'School', 
    required: true 
  },
  name: { type: String, required: true },
  rollNo: { type: Number, required: true },
  studentClass: { type: String, required: true }, 
  section: { type: String, required: true },     
  guardianContact: { type: String, required: true },
  address: String,
  status: { type: String, enum: ['active', 'inactive'], default: 'active' }
}, { timestamps: true });


studentSchema.index({ schoolId: 1, rollNo: 1 }, { unique: true });

export default mongoose.model('Student', studentSchema);
