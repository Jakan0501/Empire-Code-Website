import mongoose from "mongoose";
import bcrypt from 'bcrypt';

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
        required: true,
        unique: true
    },
    teacherPassword:{
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

teacherSchema.pre('save', async function(next) {
    if (!this.isModified('teacherPassword')) {
        return next();
    }

    try {
        const salt = await bcrypt.genSalt(10);
        this.teacherPassword = await bcrypt.hash(this.teacherPassword, salt);
        next();
    } catch (error) {
        return next(error);
    }
});

// Compare the entered password with the hashed password
teacherSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.teacherPassword);
};

const Teacher = mongoose.model('Teacher', teacherSchema)

export default Teacher;