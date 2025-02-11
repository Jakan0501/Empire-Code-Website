import express from 'express'
import {getTeachers, getTeacherById, createTeacher, updateTeacher, deleteTeacher, loginTeacher} from '../controller/teacherController.js'

const router = express.Router()

router.get('/get', getTeachers)
router.get('/get/:id', getTeacherById)
router.post('/create', createTeacher)
router.put('/update/:id', updateTeacher)
router.delete('/delete/:id', deleteTeacher)
router.post("/login", loginTeacher);

export default router;