import express from 'express'
import {getLessons, createLesson, updateLesson, deleteLesson, getLessonById} from '../controller/lessonController.js'

const router = express.Router()

router.get('/get', getLessons)
router.get('/get/:id', getLessonById); // Add this line
router.post('/create', createLesson)
router.put('/update/:id', updateLesson)
router.delete('/delete/:id', deleteLesson)

export default router;