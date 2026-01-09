const express = require('express');
const router = express.Router();
const { markAttendance, getAttendanceReport } = require('../controllers/attendanceController');
const { protect } = require('../middlewares/authMiddleware');

router.use(protect); 

router.post('/mark', markAttendance);
router.get('/report', getAttendanceReport);

module.exports = router;