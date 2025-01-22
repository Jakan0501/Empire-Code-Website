import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({
    quizQuestion:{
        type: String,
        required: true
    },
    quizAnswer:{
        type: String,
        required: true
    },
    quizResult:{
        type: String,
        required: true
    },
    lesson: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Lesson" 
    },
},{
    timestamps:true // createdAt, updatedAt
});

const Quiz = mongoose.model('Quiz', quizSchema)

export default Quiz;