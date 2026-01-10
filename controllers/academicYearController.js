// import AcademicYear from '../models/AcademicYear.js';

import AcademicYear from "../model/AcademicYear.js";

export const createAcademicYear = async (req, res) => {
  try {
    const { year } = req.body;
    const schoolId = req.user.schoolId; 

    const existingYear = await AcademicYear.findOne({ schoolId, year });
    if (existingYear) return res.status(400).json({ message: "Year already exists!" });

    if (req.body.isCurrent) {
      await AcademicYear.updateMany({ schoolId }, { isCurrent: false });
    }

    const newYear = await AcademicYear.create({
      schoolId,
      year,
      isCurrent: req.body.isCurrent || true
    });

    res.status(201).json({ success: true, data: newYear });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};


export const getAllAcademicYears = async (req, res) => {
  try {
    const schoolId = req.user.schoolId;
    const years = await AcademicYear.find({ schoolId }).sort({ year: -1 }); 

    res.status(200).json({ success: true, data: years });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


export const updateAcademicYear = async (req, res) => {
  try {
    const { year, isCurrent } = req.body;
    const schoolId = req.user.schoolId;

  
    if (isCurrent) {
      await AcademicYear.updateMany({ schoolId }, { isCurrent: false });
    }

    const updatedYear = await AcademicYear.findOneAndUpdate(
      { _id: req.params.id, schoolId },
      { year, isCurrent },
      { new: true }
    );

    res.status(200).json({ success: true, data: updatedYear });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};


export const deleteAcademicYear = async (req, res) => {
  try {
    await AcademicYear.findOneAndDelete({ _id: req.params.id, schoolId: req.user.schoolId });
    res.status(200).json({ success: true, message: "Year deleted successfully" });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};