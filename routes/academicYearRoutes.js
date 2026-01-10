import express from 'express';
import protect from '../middleware/authMiddleware.js';
import { 
    createAcademicYear, 
    getAllAcademicYears, 
    updateAcademicYear, 
    deleteAcademicYear 
} from '../controllers/academicYearController.js';

const router = express.Router();

router.use(protect);

router.route('/')
  .post(createAcademicYear)      
  .get(getAllAcademicYears);     

router.route('/:id')
  .put(updateAcademicYear)       
  .delete(deleteAcademicYear);   

export default router;