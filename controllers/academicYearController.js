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