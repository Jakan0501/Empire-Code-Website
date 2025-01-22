import Quiz from '../models/quizModel.js'
import mongoose from 'mongoose'


export const getQuizs = async(req, res) => {

    try {
        const quizs = await Quiz.find({})
        res.status(200).json({ success: true, data: quizs })
    } catch (error) {
        console.log('error in fetching quizs:', error.message)
        res.status(500).json({success: false, message:'Server Error'})
    }
}

export const createQuiz = async(req, res) => {
    const quiz = req.body;

    if (!quiz.name || !quiz.price ){
        return res.status(400).json({ success:false, message: 'Please provide all fields'})
    }
    const newQuiz = new Quiz(quiz)

    try{
        await newQuiz.save();
        res.status(201).json({ success: true, data: newQuiz})
    } catch (error){
        console.error('Error in Create quiz:', error.message)
        res.status(500).json({ success: false, message: 'Server Error'})
    }
} 

export const updateQuiz = async(req, res) => {
    const{id} = req.params;

    const quiz = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success: false, message:'Invalid Quiz Id'})
    }

    try {
        const updatedQuiz = await Quiz.findByIdAndUpdate(id, quiz, {new: true})
        res.status(200).json({ success: true, data: updatedQuiz})
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error'})
    }
}

export const deleteQuiz = async(req, res) =>{
    const {id} = req.params
    
    try {
        await Quiz.findByIdAndDelete(id);
        res.status(200).json({ success: true, message:'Quiz Deleted'})
    } catch (error) {
        console.log('error in deleting quizs:', error.message)
        res.status(500).json({ success: false, message:'Server Error'})
    }
}