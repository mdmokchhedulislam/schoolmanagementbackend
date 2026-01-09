
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { 
    type: String, 
    enum: ['superadmin', 'admin', 'teacher', 'student'], 
    default: 'student' 
  },
  schoolId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'School',
    required: function() { return this.role !== 'superadmin'; } 
  }
}, { timestamps: true });

export default mongoose.model('User', userSchema);
