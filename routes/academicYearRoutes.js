import express from 'express';
import { createAcademicYear } from '../controllers/academicYearController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/create', protect, createAcademicYear);


export default router;