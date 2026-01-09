const Student = require('../models/Student');

exports.addStudent = async (req, res) => {
  try {
    const studentData = {
      ...req.body,
      schoolId: req.user.schoolId 
    };

    const student = await Student.create(studentData);
    res.status(201).json({ success: true, data: student });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};


exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find({ schoolId: req.user.schoolId });
    res.status(200).json({ success: true, count: students.length, data: students });
  } catch (error) {
    res.status(500).json({ success: false, error: "Server Error" });
  }
};