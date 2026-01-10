import express from 'express';
import protect from '../middleware/authMiddleware.js';
import { 
    createClass, 
    getAllClasses, 
    updateClass, 
    deleteClass 
} from '../controllers/ClassController.js';

const router = express.Router();


router.use(protect);


router.route('/')
  .post(createClass)      
  .get(getAllClasses);    

router.route('/:id')
  .put(updateClass)      
  .delete(deleteClass);   

export default router;