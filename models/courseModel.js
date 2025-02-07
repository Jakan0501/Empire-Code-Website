import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    courseTitle:{
        type: String,
        required: true
    },
    courseDescription:{
        type: String,
    },
    coursePrice:{
        type: Number,
        required: true
    },
    teacher: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Teacher",
        
    }, 
    
    lessons: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Lesson"
    }],
    enrollment: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Enrollment"
    }],
},{
    timestamps:true // createdAt, updatedAt
});

const Course = mongoose.model('Course', courseSchema)

export default Course;