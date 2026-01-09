const express = require('express');
const router = express.Router();
const { addStudent, getAllStudents } = require('../controllers/studentController');
const { protect } = require('../middlewares/authMiddleware');


router.use(protect);

router.route('/')
  .post(addStudent)
  .get(getAllStudents);

module.exports = router;