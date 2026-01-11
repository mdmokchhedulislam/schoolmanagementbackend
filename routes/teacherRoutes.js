import express from "express";


import { createTeacher, deleteTeacher, getTeacherById, getTeachers, updateTeacher } from "../controllers/TeacherController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();


router.use(protect); 

router.route("/")
    .post(createTeacher)
    .get(getTeachers) 


router.route("/:id")
    .get(getTeacherById)
    .patch(updateTeacher) 
    .delete(deleteTeacher);

export default router;