// routes/studentRoutes.js
import express from 'express';
import { addStudent, getAllStudents } from '../controllers/studentController.js';
// import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Protect all routes
// router.use(protect);

router.route('/')
  .post(addStudent)
  .get(getAllStudents);

export default router;
