
import Class from "../model/Class.js";

export const createClass = async (req, res) => {
  try {
    const { className, sections } = req.body;
    const schoolId = req.user.schoolId;

    const existingClass = await Class.findOne({ schoolId, className });
    if (existingClass) return res.status(400).json({ message: "Class already exists!" });

    const newClass = await Class.create({
      schoolId,
      className,
      sections 
    });

    res.status(201).json({ success: true, data: newClass });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};


export const getAllClasses = async (req, res) => {
  try {
    const schoolId = req.user.schoolId;
    const classes = await Class.find({ schoolId }).sort({ className: 1 }); 

    res.status(200).json({ 
      success: true, 
      count: classes.length, 
      data: classes 
    });
  } catch (error) {
    res.status(500).json({ success: false, error: "server error" });
  }
};

export const updateClass = async (req, res) => {
  try {
    const { className, sections } = req.body;
    const classId = req.params.id;
    const schoolId = req.user.schoolId;

    const updatedClass = await Class.findOneAndUpdate(
      { _id: classId, schoolId }, 
      { className, sections },
      { new: true, runValidators: true }
    );

    if (!updatedClass) {
      return res.status(404).json({ success: false, message: "class not found" });
    }

    res.status(200).json({ success: true, data: updatedClass });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};


export const deleteClass = async (req, res) => {
  try {
    const classId = req.params.id;
    const schoolId = req.user.schoolId;

    const deletedClass = await Class.findOneAndDelete({ _id: classId, schoolId });

    if (!deletedClass) {
      return res.status(404).json({ success: false, message: "class not found" });
    }

    res.status(200).json({ success: true, message: "Class deleted successfully!" });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};