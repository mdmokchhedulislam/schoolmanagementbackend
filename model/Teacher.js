import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema({

    schoolId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'School',
        required: [true, 'School ID is required for SaaS isolation'],
        index: true 
    },
    
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User reference is required']
    },

    teacherId: {
        type: String,
        required: [true, 'Teacher Unique ID is required'],
        trim: true
    },

    designation: {
        type: String,
        required: [true, 'Designation is required'],
        enum: ['Principal', 'Assistant Principal', 'Head Teacher', 'Assistant Teacher', 'Lecturer'],
        default: 'Assistant Teacher'
    },

    department: {
        type: String, 
        required: true
    },

    qualification: {
        type: String, 
        required: true
    },

    assignedClasses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Class'
    }],

    specializedSubjects: [String],

    salaryInfo: {
        baseSalary: { type: Number, default: 0 },
        bankAccount: { type: String, trim: true },
        panOrNid: { type: String }
    },

    experience: {
        joiningDate: { type: Date, default: Date.now },
        previousExperience: { type: String } 
    },

    status: {
        type: String,
        enum: ['Active', 'On Leave', 'Suspended', 'Resigned'],
        default: 'Active'
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }

}, { 
    timestamps: true 
});

teacherSchema.index({ schoolId: 1, teacherId: 1 }, { unique: true });

export default mongoose.model('Teacher', teacherSchema);