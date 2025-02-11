import express from 'express';
import { 
    getLessons, createLesson, updateLesson, 
    deleteLesson, getLessonById, getLessonPdf ,getLessonsByCourse
} from '../controller/lessonController.js';

const router = express.Router();

router.get('/get', getLessons);
router.get('/get/:id', getLessonById);
router.get('/pdf/:id', getLessonPdf);
router.post('/create', createLesson); // No need to manually set up multer here
router.put('/update/:id', updateLesson);
router.delete('/delete/:id', deleteLesson);
router.get('/course/:id', getLessonsByCourse);

export default router;
