import express from 'express'
import {getQuizs, createQuiz, updateQuiz, deleteQuiz, getQuizById} from '../controller/quizController.js'

const router = express.Router()

router.get('/get', getQuizs)
router.post('/create', createQuiz)
router.put('/update/:id', updateQuiz)
router.delete('/delete/:id', deleteQuiz)
router.get('/get/:id', getQuizById);

export default router;