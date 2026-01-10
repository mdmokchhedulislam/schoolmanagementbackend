// routes/studentRoutes.js
import express from 'express';
import {
  addStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
  getStudentCount
} from '../controllers/studentController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

//  Protect all routes
router.use(protect);

//  Students base route
router.route('/')
  .post(addStudent)       
  .get(getAllStudents);    

// count/total route
router.route('/count/total')
  .get(getStudentCount);

// Specific student by ID
router.route('/:id')
  .get(getStudentById)     
  .put(updateStudent)      
  .delete(deleteStudent);  

export default router;
