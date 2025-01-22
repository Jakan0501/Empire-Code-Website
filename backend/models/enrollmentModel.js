import mongoose from "mongoose";

const enrollmentSchema = new mongoose.Schema({
    enrollmentDate: { 
        type: Date, 
        default: Date.now 
    },
    status: { 
        type: String, 
        enum: ["active", "completed", "dropped"], 
        default: "active" 
    },
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User" 
    }, // Reference to User
    course: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Course" 
    }, // Reference to Course

},{
    timestamps:true // createdAt, updatedAt
});

const Enrollment = mongoose.model('Enrollment', enrollmentSchema)

export default Enrollment;