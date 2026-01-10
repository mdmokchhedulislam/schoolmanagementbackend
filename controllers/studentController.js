import Student from '../model/Student.js';
// Role check helper
const checkStudentRole = (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ success: false, message: "Access denied: only admin can access student and teacher data" });
  }
};


//  Add Student
export const addStudent = async (req, res) => {
  try {
    const studentData = { ...req.body, schoolId: req.user.schoolId };
    const student = await Student.create(studentData);
    res.status(201).json({ success: true, data: student });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find({ 
      schoolId: req.user.schoolId, 
    });

    // console.log("student is ", students);
    res.status(200).json({ 
      success: true, 
      count: students.length, 
      data: students 
    });
  } catch (error) {
    res.status(500).json({ success: false, error: "Server Error" });
  }
};


// Get single student by ID
export const getStudentById = async (req, res) => {
  const roleCheck = checkStudentRole(req, res);
  if (roleCheck) return roleCheck;

  try {
    const { id } = req.params;
    const student = await Student.findOne({ _id: id, schoolId: req.user.schoolId });
    if (!student) return res.status(404).json({ success: false, message: "Student not found" });
    res.status(200).json({ success: true, data: student });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


// Update student
export const updateStudent = async (req, res) => {
  const roleCheck = checkStudentRole(req, res);
  if (roleCheck) return roleCheck;

  try {
    const { id } = req.params;
    const updatedStudent = await Student.findOneAndUpdate(
      { _id: id, schoolId: req.user.schoolId },
      req.body,
      { new: true }
    );
    if (!updatedStudent) return res.status(404).json({ success: false, message: "Student not found" });
    res.status(200).json({ success: true, data: updatedStudent });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Delete student
export const deleteStudent = async (req, res) => {
  const roleCheck = checkStudentRole(req, res);
  if (roleCheck) return roleCheck;

  try {
    const { id } = req.params;
    const deletedStudent = await Student.findOneAndDelete({ _id: id, schoolId: req.user.schoolId });
    if (!deletedStudent) return res.status(404).json({ success: false, message: "Student not found" });
    res.status(200).json({ success: true, message: "Student deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get total number of students
export const getStudentCount = async (req, res) => {
  const roleCheck = checkStudentRole(req, res);
  if (roleCheck) return roleCheck;

  try {
    const count = await Student.countDocuments({ schoolId: req.user.schoolId });
    res.status(200).json({ success: true, totalStudents: count });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
