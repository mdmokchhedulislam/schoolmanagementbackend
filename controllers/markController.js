
import Mark from '../models/Mark.js';
import { calculateGrade } from '../utils/gradeCalculator.js';

export const inputMarks = async (req, res) => {
  try {
    const { studentId, examId, subjectName, theoryMarks, practicalMarks } = req.body;
    const total = theoryMarks + practicalMarks;
    const { grade, point } = calculateGrade(total);

    const markEntry = await Mark.findOneAndUpdate(
      { studentId, examId, subjectName },
      { 
        schoolId: req.user.schoolId,
        theoryMarks, 
        practicalMarks, 
        totalMarks: total, 
        grade, 
        point 
      },
      { upsert: true, new: true }
    );

    res.status(200).json({ success: true, data: markEntry });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getStudentResult = async (req, res) => {
  try {
    const { studentId, examId } = req.params;
    const results = await Mark.find({ studentId, examId });

    const totalPoints = results.reduce((acc, curr) => acc + curr.point, 0);
    const cgpa = results.length > 0 ? (totalPoints / results.length).toFixed(2) : 0;

    res.status(200).json({ 
      success: true, 
      data: results, 
      cgpa,
      isPassed: results.every(r => r.grade !== 'F') 
    });
  } catch (error) {
    res.status(500).json({ success: false, error: "Result fetch failed" });
  }
};
