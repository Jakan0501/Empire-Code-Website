import mongoose from "mongoose";
import bcrypt from "bcryptjs"; // For password hashing
import jwt from 'jsonwebtoken'; // Import jsonwebtoken

// Define the user schema

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    userPassword: {
      type: String,
      required: true,
    },
    userEmail: {
      type: String,
      required: true,
      unique: true,
    },
    userPhone: {
      type: Number,
    },
    profilePicture: { // New field for storing profile picture URL
      type: String,
      default: '', // Default is empty string
    },
    registrationDate: {
      type: Date,
      default: Date.now,
    },
    enrollment: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Enrollment",
      },
    ],
  },
  {
    timestamps: true,
  }
);


// Middleware to hash the password before saving the user
userSchema.pre("save", async function (next) {
  // Only hash the password if it has been modified
  if (!this.isModified("userPassword")) {
    return next(); // Skip hashing if password is not modified
  }

  // Generate a salt and hash the password
  const salt = await bcrypt.genSalt(10);
  this.userPassword = await bcrypt.hash(this.userPassword, salt);
  next(); // Proceed to save the user
});

// Method to compare entered password with the hashed password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.userPassword);
};

// Method to generate a JWT token
userSchema.methods.generateToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "30d", // Token expires in 30 days
  });
};

// Create and export the User model
const User = mongoose.model("User", userSchema);
export default User;
