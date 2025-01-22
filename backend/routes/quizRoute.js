import express from 'express'
import {getQuizs, createQuiz, updateQuiz, deleteQuiz} from '../controller/quizController.js'

const router = express.Router()

router.get('/', getQuizs)
router.post('/', createQuiz)
router.put('/:id', updateQuiz)
router.delete('/:id', deleteQuiz)

export default router;