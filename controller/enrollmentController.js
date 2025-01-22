import Enrollment from '../models/enrollmentModel.js'
import mongoose from 'mongoose'


export const getEnrollments = async(req, res) => {

    try {
        const enrollments = await Enrollment.find({})
        res.status(200).json({ success: true, data: enrollments })
    } catch (error) {
        console.log('error in fetching enrollments:', error.message)
        res.status(500).json({success: false, message:'Server Error'})
    }
}

export const createEnrollment = async(req, res) => {
    const enrollment = req.body;

    try{
        await newEnrollment.save();
        res.status(201).json({ success: true, data: newEnrollment})
    } catch (error){
        console.error('Error in Create enrollment:', error.message)
        res.status(500).json({ success: false, message: 'Server Error'})
    }
} 

export const updateEnrollment = async(req, res) => {
    const{id} = req.params;

    const enrollment = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success: false, message:'Invalid Enrollment Id'})
    }

    try {
        const updatedEnrollment = await Enrollment.findByIdAndUpdate(id, enrollment, {new: true})
        res.status(200).json({ success: true, data: updatedEnrollment})
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error'})
    }
}

export const deleteEnrollment = async(req, res) =>{
    const {id} = req.params
    
    try {
        await Enrollment.findByIdAndDelete(id);
        res.status(200).json({ success: true, message:'Enrollment Deleted'})
    } catch (error) {
        console.log('error in deleting enrollments:', error.message)
        res.status(500).json({ success: false, message:'Server Error'})
    }
}