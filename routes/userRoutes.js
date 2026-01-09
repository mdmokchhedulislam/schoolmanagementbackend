import express from 'express';
import createUser from '../controllers/UserController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();


router.use(protect);


router.post('/create', createUser);

export default router;