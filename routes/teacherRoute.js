import express from 'express'
import {getTeachers, createTeacher, updateTeacher, deleteTeacher, loginTeacher} from '../controller/teacherController.js'

const router = express.Router()

router.get('/get', getTeachers)
router.post('/create', createTeacher)
router.put('/update/:id', updateTeacher)
router.delete('/delete/:id', deleteTeacher)
router.post("/login", loginTeacher);

export default router;