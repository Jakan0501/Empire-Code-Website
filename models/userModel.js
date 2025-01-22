import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userName:{
        type: String,
        
    },
    userPassword:{
        type: String,
        required: true
    },
    userEmail:{
        type: String,
        required: true
    },
    userPhone:{
        type: Number,
        
    },
    registrationDate: { 
        type: Date, 
        default: Date.now
    },
    enrollment: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Enrollment"
    }],
},{
    timestamps:true // createdAt, updatedAt
});

const User = mongoose.model('User', userSchema)

export default User;