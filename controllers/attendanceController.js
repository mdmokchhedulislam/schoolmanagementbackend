const Attendance = require('../models/Attendance');

exports.markAttendance = async (req, res) => {
  try {
    const { attendanceData, date, className, section } = req.body;
    const schoolId = req.user.schoolId;

    const records = attendanceData.map(item => ({
      schoolId,
      studentId: item.studentId,
      status: item.status,
      date: new Date(date),
      class: className,
      section: section,
      markedBy: req.user.id
    }));

    const operations = records.map(record => ({
      updateOne: {
        filter: { studentId: record.studentId, date: record.date },
        update: { $set: record },
        upsert: true
      }
    }));

    await Attendance.bulkWrite(operations);

    res.status(200).json({ success: true, message: "Attendance marked successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getAttendanceReport = async (req, res) => {
  try {
    const { date, className, section } = req.query;
    const report = await Attendance.find({
      schoolId: req.user.schoolId,
      date: new Date(date),
      class: className,
      section: section
    }).populate('studentId', 'name rollNo');

    res.status(200).json({ success: true, data: report });
  } catch (error) {
    res.status(500).json({ success: false, error: "Report failed" });
  }
};