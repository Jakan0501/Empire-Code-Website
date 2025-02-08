import Teacher from '../models/teacherModel.js'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

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

    if (!teacher.teacherName || !teacher.teacherPhone ||!teacher.teacherEmail
        ||!teacher.teacherPassword
    ){
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

export const loginTeacher = async (req, res) => {
    const { teacherEmail, teacherPassword } = req.body;

    try {
        // Find the teacher by email
        const teacher = await Teacher.findOne({ teacherEmail });

        // Check if teacher exists
        if (!teacher) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Compare the entered password with the hashed password
        const isMatch = await bcrypt.compare(teacherPassword, teacher.teacherPassword);

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Generate a token
        const token = jwt.sign({ id: teacher._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Respond with teacher info and token
        res.status(200).json({
            _id: teacher._id,
            teacherName: teacher.teacherName,
            teacherEmail: teacher.teacherEmail,
            token,
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};