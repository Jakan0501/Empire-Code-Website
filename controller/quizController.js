import Quiz from '../models/quizModel.js';
import Lesson from '../models/lessonModel.js'; // Import Lesson model for validation
import mongoose from 'mongoose';

export const getQuizs = async (req, res) => {
    const { lessonId } = req.params; // Get lessonId from URL parameters

    try {
        // If lessonId is provided, filter quizzes by lessonId
        const query = lessonId ? { lesson: lessonId } : {};
        const quizzes = await Quiz.find(query);

        if (!quizzes.length) {
            return res.status(404).json({ success: false, message: 'No quizzes found for this lesson' });
        }

        res.status(200).json({ success: true, data: quizzes });
    } catch (error) {
        console.log('Error in fetching quizzes:', error.message);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

export const getAllQuizs = async (req, res) => {
    try {
        const quizs = await Quiz.find({});
        res.status(200).json({ success: true, data: quizs });
    } catch (error) {
        console.log('error in fetching quizs:', error.message);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

export const createQuiz = async (req, res) => {
    const quizzes = req.body; // Expecting an array of quizzes

    // Check if the body is an array and validate each quiz
    if (!Array.isArray(quizzes) || quizzes.length === 0 || quizzes.some(quiz => 
        !quiz.quizQuestion || 
        !quiz.quizAnswer || 
        !quiz.quizResult || 
        !quiz.quizOptions || 
        !Array.isArray(quiz.quizOptions) || 
        quiz.quizOptions.length === 0 ||
        !quiz.lesson // Ensure lesson ID is provided
    )) {
        return res.status(400).json({ success: false, message: 'Please provide all fields for each quiz, including quizOptions and lesson ID' });
    }

    // Validate lesson existence before creating quizzes
    const lessonId = quizzes[0].lesson;
    const lessonExists = await Lesson.findById(lessonId);
    if (!lessonExists) {
        return res.status(400).json({ success: false, message: 'Invalid lesson ID provided' });
    }

    try {
        const newQuizzes = await Quiz.insertMany(quizzes); // Use insertMany to save multiple quizzes
        res.status(201).json({ success: true, data: newQuizzes });
    } catch (error) {
        console.error('Error in Create quiz:', error.message);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

export const updateQuiz = async (req, res) => {
    const { id } = req.params;
    const quiz = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: 'Invalid Quiz Id' });
    }

    try {
        const updatedQuiz = await Quiz.findByIdAndUpdate(id, quiz, { new: true });
        res.status(200).json({ success: true, data: updatedQuiz });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

export const deleteQuiz = async (req, res) => {
    const { id } = req.params;

    try {
        await Quiz.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: 'Quiz Deleted' });
    } catch (error) {
        console.log('Error in deleting quiz:', error.message);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

export const getQuizById = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: 'Invalid Quiz Id' });
    }

    try {
        const quiz = await Quiz.findById(id);
        if (!quiz) {
            return res.status(404).json({ success: false, message: 'Quiz not found' });
        }
        res.status(200).json({ success: true, data: quiz });
    } catch (error) {
        console.log('Error fetching quiz:', error.message);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};
