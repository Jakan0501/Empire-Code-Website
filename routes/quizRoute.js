import express from 'express';
import { getQuizs, createQuiz, updateQuiz, deleteQuiz, getQuizById, getAllQuizs } from '../controller/quizController.js';

const router = express.Router();

// Fetch quizzes by lesson ID
router.get('/getByLesson/:lessonId', getQuizs); // Updated route
router.post('/create', createQuiz);
router.put('/update/:id', updateQuiz);
router.delete('/delete/:id', deleteQuiz);
router.get('/get/:id', getQuizById);
router.get('/get', getAllQuizs); 

export default router;
