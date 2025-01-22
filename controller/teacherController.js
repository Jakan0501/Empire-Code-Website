import Teacher from '../models/teacherModel.js'
import mongoose from 'mongoose'


export const getTeachers = async(req, res) => {

    try {
        const teachers = await Teacher.find({})
        res.status(200).json({ success: true, data: teachers })
    } catch (error) {
        console.log('error in fetching teachers:', error.message)
        res.status(500).json({success: false, message:'Server Error'})
    }
}

export const createTeacher = async(req, res) => {
    const teacher = req.body;

    if (!teacher.teacherName || !teacher.teacherPhone ||!teacher.teacherEmail){
        return res.status(400).json({ success:false, message: 'Please provide all fields'})
    }
    const newTeacher = new Teacher(teacher)

    try{
        await newTeacher.save();
        res.status(201).json({ success: true, data: newTeacher})
    } catch (error){
        console.error('Error in Create teacher:', error.message)
        res.status(500).json({ success: false, message: 'Server Error'})
    }
} 

export const updateTeacher = async(req, res) => {
    const{id} = req.params;

    const teacher = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success: false, message:'Invalid Teacher Id'})
    }

    try {
        const updatedTeacher = await Teacher.findByIdAndUpdate(id, teacher, {new: true})
        res.status(200).json({ success: true, data: updatedTeacher})
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error'})
    }
}

export const deleteTeacher = async(req, res) =>{
    const {id} = req.params
    
    try {
        await Teacher.findByIdAndDelete(id);
        res.status(200).json({ success: true, message:'Teacher Deleted'})
    } catch (error) {
        console.log('error in deleting teachers:', error.message)
        res.status(500).json({ success: false, message:'Server Error'})
    }
}