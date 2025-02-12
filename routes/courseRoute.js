import express from 'express';
import { getCourses, createCourse, updateCourse, deleteCourse, getCourseById, searchCourses } from '../controller/courseController.js';

const router = express.Router();

router.get('/get', getCourses);
router.post('/create', createCourse);
router.put('/update/:id', updateCourse);
router.delete('/delete/:id', deleteCourse);
router.get('/get/:id', getCourseById);
router.get('/search', searchCourses); // Ensure this route is handling the search

export default router;
