import express from 'express'
import {getEnrollments, createEnrollment, updateEnrollment, deleteEnrollment} from '../controller/enrollmentController.js'

const router = express.Router()

router.get('/get', getEnrollments)
router.post('/create', createEnrollment)
router.put('/update/:id', updateEnrollment)
router.delete('/delete/:id', deleteEnrollment)

export default router;