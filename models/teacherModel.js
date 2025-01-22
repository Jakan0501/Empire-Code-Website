import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema({
    teacherName:{
        type: String,
        required: true
    },
    teacherBio:{
        type: String,
    },
    teacherPhone:{
        type: Number,
        required: true
    },
    teacherEmail:{
        type: String,
        required: true
    },
    courses: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Course" 
        }],
},{
    timestamps:true // createdAt, updatedAt
});

const Teacher = mongoose.model('Teacher', teacherSchema)

export default Teacher;