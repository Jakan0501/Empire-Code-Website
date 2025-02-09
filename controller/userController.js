import asyncHandler from 'express-async-handler';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import User from '../models/userModel.js';

// Configure multer for profile picture uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = 'uploads';
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });
export const uploadMiddleware = upload.single('profilePicture');

// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
export const registerUser = asyncHandler(async (req, res) => {
    const { userEmail, userPassword, userPhone, userName } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ userEmail });
    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    // Create user
    const user = await User.create({ userEmail, userPassword, userPhone, userName });

    if (user) {
        res.status(201).json({
            _id: user._id,
            userEmail: user.userEmail,
            token: user.generateToken(),
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});

// @desc    Authenticate user & get token
// @route   POST /api/users/login
// @access  Public
export const loginUser = asyncHandler(async (req, res) => {
    const { userEmail, userPassword } = req.body;

    const user = await User.findOne({ userEmail });

    if (!user || !(await user.matchPassword(userPassword))) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    res.status(200).json({
        _id: user._id,
        userName: user.userName,
        userEmail: user.userEmail,
        token: user.generateToken(),
    });
});

// @desc    Fetch all users
// @route   GET /api/users
// @access  Private
export const fetchUsers = asyncHandler(async (req, res) => {
    const users = await User.find({});
    res.status(200).json(users);
});

// @desc    Delete a user
// @route   DELETE /api/users/:id
// @access  Private
export const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
        // Delete profile picture if exists
        if (user.profilePicture) {
            const oldFilePath = path.join('uploads', user.profilePicture);
            if (fs.existsSync(oldFilePath)) {
                fs.unlinkSync(oldFilePath);
            }
        }

        await user.remove();
        res.status(200).json({ message: 'User removed' });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
export const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        res.status(200).json({
            _id: user._id,
            userEmail: user.userEmail,
            userName: user.userName,
            userPhone: user.userPhone,
            profilePicture: user.profilePicture, // Include profile picture
            registrationDate: user.registrationDate,
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// @desc    Update a user
// @route   PUT /api/users/:id
// @access  Private
export const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
        user.userName = req.body.userName || user.userName;
        user.userEmail = req.body.userEmail || user.userEmail;
        user.userPhone = req.body.userPhone || user.userPhone;

        if (req.body.userPassword) {
            user.userPassword = req.body.userPassword;
        }

        const updatedUser = await user.save();
        res.status(200).json(updatedUser);
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// @desc    Upload Profile Picture
// @route   POST /api/users/upload/:id
// @access  Private
export const uploadProfilePicture = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
    }

    if (!req.file) {
        return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    // Delete old profile picture if exists
    if (user.profilePicture) {
        const oldFilePath = path.join('uploads', user.profilePicture);
        if (fs.existsSync(oldFilePath)) {
            fs.unlinkSync(oldFilePath);
        }
    }

    user.profilePicture = req.file.filename;
    await user.save();

    res.status(200).json({ success: true, message: 'Profile picture updated', filename: req.file.filename });
});

// @desc    Fetch Profile Picture
// @route   GET /api/users/uploads/:filename
// @access  Public
export const getProfilePicture = asyncHandler(async (req, res) => {
    const { filename } = req.params;
    const filePath = path.join('uploads', filename);

    if (!fs.existsSync(filePath)) {
        return res.status(404).json({ success: false, message: 'Profile picture not found' });
    }

    res.sendFile(path.resolve(filePath));
});
