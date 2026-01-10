import mongoose from 'mongoose';
import Student from '../model/Student.js'
import Enrollment from '../model/Enrollment.js';

export const addStudent = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { 
      name, 
      currentClass,      
      section, 
      rollNo, 
      currentAcademicYear,
      guardianContact,
      address 
    } = req.body;

    const schoolId = req.user.schoolId; 

  
    const student = await Student.create([{
      schoolId,
      name,
      currentClass,       
      currentAcademicYear, 
      section,
      rollNo,
      guardianContact,
      address
    }], { session });

    await Enrollment.create([{
      schoolId,
      studentId: student[0]._id,
      classId: currentClass,       
      academicYear: currentAcademicYear, 
      section,
      rollNo
    }], { session });

    await session.commitTransaction();
    res.status(201).json({ 
      success: true, 
      message: "Student profile and enrollment created successfully!" 
    });

  } catch (error) {
    await session.abortTransaction();
    res.status(400).json({ success: false, error: error.message });
  } finally {
    session.endSession();
  }
};


export const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find({ schoolId: req.user.schoolId })
      .populate('currentClass', 'className') 
      .populate('currentAcademicYear', 'year') 
      .sort({ createdAt: -1 }); 

    res.status(200).json({ 
      success: true, 
      count: students.length, 
      data: students 
    });
  } catch (error) {
    res.status(500).json({ success: false, error: "server error" });
  }
};


export const getStudentById = async (req, res) => {
  try {
    const student = await Student.findOne({ 
      _id: req.params.id, 
      schoolId: req.user.schoolId 
    }).populate('currentClass currentAcademicYear');

    if (!student) return res.status(404).json({ message: "student not found" });

    res.status(200).json({ success: true, data: student });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


export const updateStudent = async (req, res) => {
  try {
    const student = await Student.findOneAndUpdate(
      { _id: req.params.id, schoolId: req.user.schoolId },
      req.body,
      { new: true, runValidators: true }
    );

    if (!student) return res.status(404).json({ message: "student not found" });

  
    await Enrollment.findOneAndUpdate(
      { studentId: student._id, schoolId: req.user.schoolId },
      { 
        classId: student.currentClass, 
        section: student.section, 
        rollNo: student.rollNo 
      }
    );

    res.status(200).json({ success: true, data: student });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};



export const deleteStudent = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const studentId = req.params.id;
    const schoolId = req.user.schoolId;

    const deletedStudent = await Student.findOneAndDelete({ _id: studentId, schoolId });
    if (!deletedStudent) throw new Error("Student not found");

    await Enrollment.deleteMany({ studentId, schoolId }, { session });

    await session.commitTransaction();
    res.status(200).json({ success: true, message: "Student and records deleted!" });
  } catch (error) {
    await session.abortTransaction();
    res.status(400).json({ success: false, error: error.message });
  } finally {
    session.endSession();
  }
};