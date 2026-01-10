import express from 'express';
import {
  addStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent
} from '../controllers/studentController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);

router.route('/')
  .post(addStudent)     
  .get(getAllStudents);  

router.route('/:id')
  .get(getStudentById)   
  .put(updateStudent)    
  .delete(deleteStudent); 

export default router;