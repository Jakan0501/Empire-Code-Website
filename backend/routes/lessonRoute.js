import express from 'express'
import {getLessons, createLesson, updateLesson, deleteLesson} from '../controller/lessonController.js'

const router = express.Router()

router.get('/get', getLessons)
router.post('/post', createLesson)
router.put('/update/:id', updateLesson)
router.delete('/delete/:id', deleteLesson)

export default router;