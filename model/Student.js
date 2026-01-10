import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  schoolId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'School', 
    required: true 
  },
  name: { type: String, required: true },
  
  currentClass: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Class', 
    required: true 
  }, 
  
  section: { type: String, required: true }, // উদাহরণ: "A"
  rollNo: { type: Number, required: true },
  
  currentAcademicYear: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'AcademicYear', 
    required: true 
  },

  guardianContact: { type: String, required: true },
  address: String,
  
  status: { 
    type: String, 
    enum: ['active', 'inactive', 'dropped', 'graduated'], 
    default: 'active' 
  }
}, { timestamps: true });


studentSchema.index(
  { 
    schoolId: 1, 
    currentAcademicYear: 1, 
    currentClass: 1, 
    section: 1, 
    rollNo: 1 
  }, 
  { unique: true }
);

export default mongoose.model('Student', studentSchema);