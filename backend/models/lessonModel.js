import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema({
    lessonTitle:{
        type: String,
        required: true
    },
    lessonContent:{
        type: String,
    },
    date: { 
        type: Date, 
        default: Date.now 
    },
    progress: { 
        type: Number, 
        default: 0 
    },
    course: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Course" 
    }, // Reference to Course
    quizzes: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Quiz" 
    }],
},{
    timestamps:true // createdAt, updatedAt
});

const Lesson = mongoose.model('Lesson', lessonSchema)

export default Lesson;