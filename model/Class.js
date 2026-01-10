import mongoose from 'mongoose';

const classSchema = new mongoose.Schema({
  schoolId: { type: mongoose.Schema.Types.ObjectId, ref: 'School', required: true },
  className: { type: String, required: true }, // উদাহরণ: "Class 9"
  sections: [{ type: String, required: true }] // উদাহরণ: ["A", "B"]
}, { timestamps: true });

export default mongoose.model('Class', classSchema);