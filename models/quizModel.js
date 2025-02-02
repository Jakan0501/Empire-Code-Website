import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({
    quizQuestion: {
        type: String,
        required: true
    },
    quizOptions: { // New field for storing multiple options
        type: [String], // Array of strings
    },
    quizAnswer: {
        type: String,
        required: true
    },
    quizResult: {
        type: String,
    },
    lesson: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Lesson" 
    },
}, {
    timestamps: true // createdAt, updatedAt
});

const Quiz = mongoose.model('Quiz', quizSchema);

export default Quiz;
