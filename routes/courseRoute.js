import express from 'express'
import {getCourses, createCourse, updateCourse, deleteCourse} from '../controller/courseController.js'

const router = express.Router()

router.get('/get', getCourses)
router.post('/create', createCourse)
router.put('/update/:id', updateCourse)
router.delete('/delete/:id', deleteCourse)

export default router;