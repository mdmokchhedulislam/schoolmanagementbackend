import express from 'express';
import { registerSchool, getSchoolProfile } from '../controllers/schoolController.js';
import  protect  from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerSchool);

router.get('/profile',protect, getSchoolProfile);

export default router;