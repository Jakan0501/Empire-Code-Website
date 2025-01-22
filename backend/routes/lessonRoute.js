import express from 'express'
import {getLessons, createLesson, updateLesson, deleteLesson} from '../controller/lessonController.js'

const router = express.Router()

router.get('/', getLessons)
router.post('/', createLesson)
router.put('/:id', updateLesson)
router.delete('/:id', deleteLesson)

export default router;