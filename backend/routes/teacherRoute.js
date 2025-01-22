import express from 'express'
import {getTeachers, createTeacher, updateTeacher, deleteTeacher} from '../controller/teacherController.js'

const router = express.Router()

router.get('/get', getTeachers)
router.post('/create', createTeacher)
router.put('/update/:id', updateTeacher)
router.delete('/delete/:id', deleteTeacher)

export default router;