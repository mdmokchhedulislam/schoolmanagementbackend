
import mongoose from "mongoose";
import bcrypt from "bcryptjs"; 
import Teacher from "../model/Teacher.js";
import User from "../model/User.js";

export const createTeacher = async (req, res) => { 
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const schoolId = req.user.schoolId; 
        const { email, password, name, ...teacherData } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            await session.abortTransaction(); 
            session.endSession();
            return res.status(400).json({ success: false, message: "User with this email already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create([{
            name,
            email,
            password: hashedPassword, 
            role: 'teacher',
            schoolId
        }], { session });

        const teacherProfile = await Teacher.create([{
            ...teacherData,
            user: newUser[0]._id, 
            schoolId,
            createdBy: req.user._id
        }], { session });

        await session.commitTransaction();
        session.endSession();

        res.status(201).json({
            success: true,
            message: "Teacher created successfully!",
            data: teacherProfile[0]
        });

    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getTeachers = async (req, res) => {
    try {
        const schoolId = req.user.schoolId;
        
        const teachers = await Teacher.find({ schoolId })
            .populate('user', 'name email image')
            .sort({ createdAt: -1 });

        res.status(200).json({ success: true, data: teachers });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


export const getTeacherById = async (req, res) => {
    try {
        const { id } = req.params;
        const schoolId = req.user.schoolId; 

        const teacher = await Teacher.findOne({ _id: id, schoolId: schoolId })
            .populate('user', 'name email role image') 
            .populate('assignedClasses', 'className section'); 

        if (!teacher) {
            return res.status(404).json({ 
                success: false, 
                message: "Teacher not found or unauthorized access" 
            });
        }

        res.status(200).json({
            success: true,
            data: teacher
        });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


export const updateTeacher = async (req, res) => {
    try {
        const { id } = req.params;
        const schoolId = req.user.schoolId; 

        const updatedTeacher = await Teacher.findOneAndUpdate(
            { _id: id, schoolId: schoolId },
            { $set: req.body },
            { new: true, runValidators: true }
        ).populate('user', 'name email');

        if (!updatedTeacher) {
            return res.status(404).json({ success: false, message: "Teacher not found in your school!" });
        }

        res.status(200).json({
            success: true,
            message: "Teacher updated successfully",
            data: updatedTeacher
        });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const deleteTeacher = async (req, res) => {
    try {
        const { id } = req.params;
        const schoolId = req.user.schoolId;

        const deletedTeacher = await Teacher.findOneAndUpdate(
            { _id: id, schoolId: schoolId },
            { status: 'Resigned' }, 
            { new: true }
        );

        if (!deletedTeacher) {
            return res.status(404).json({ success: false, message: "Teacher not found" });
        }

        res.status(200).json({
            success: true,
            message: "Teacher marked as Resigned/Inactive",
            data: deletedTeacher
        });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};