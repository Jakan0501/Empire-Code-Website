import Lesson from '../models/lessonModel.js'
import mongoose from 'mongoose'


export const getLessons = async(req, res) => {

    try {
        const lessons = await Lesson.find({})
        res.status(200).json({ success: true, data: lessons })
    } catch (error) {
        console.log('error in fetching lessons:', error.message)
        res.status(500).json({success: false, message:'Server Error'})
    }
}

export const createLesson = async(req, res) => {
    const lesson = req.body;

    if (!lesson.lessonTitle){
        return res.status(400).json({ success:false, message: 'Please provide all fields'})
    }
    const newLesson = new Lesson(lesson)

    try{
        await newLesson.save();
        res.status(201).json({ success: true, data: newLesson})
    } catch (error){
        console.error('Error in Create lesson:', error.message)
        res.status(500).json({ success: false, message: 'Server Error'})
    }
} 

export const updateLesson = async(req, res) => {
    const{id} = req.params;

    const lesson = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success: false, message:'Invalid Lesson Id'})
    }

    try {
        const updatedLesson = await Lesson.findByIdAndUpdate(id, lesson, {new: true})
        res.status(200).json({ success: true, data: updatedLesson})
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error'})
    }
}

export const deleteLesson = async(req, res) =>{
    const {id} = req.params
    
    try {
        await Lesson.findByIdAndDelete(id);
        res.status(200).json({ success: true, message:'Lesson Deleted'})
    } catch (error) {
        console.log('error in deleting lessons:', error.message)
        res.status(500).json({ success: false, message:'Server Error'})
    }
}