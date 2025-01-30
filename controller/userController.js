import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
export const registerUser = asyncHandler(async (req, res) => {
  const { userEmail, userPassword, userPhone, userName } = req.body; // Include userPhone and userName

  // Check if user already exists
  const userExists = await User.findOne({ userEmail });
  if (userExists) {
      res.status(400);
      throw new Error('User already exists');
  }

  // Create user
  const user = await User.create({ userEmail, userPassword, userPhone, userName }); // Include userPhone and userName

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
export const loginUser = async (req, res) => {
  const { userEmail, userPassword } = req.body;

  try {
      // Find the user by email
      const user = await User.findOne({ userEmail });

      // Check if user exists
      if (!user) {
          return res.status(401).json({ message: 'Invalid email or password' });
      }

      // Compare the entered password with the hashed password
      const isMatch = await user.matchPassword(userPassword);

      if (!isMatch) {
          return res.status(401).json({ message: 'Invalid email or password' });
      }

      // Generate a token
      const token = user.generateToken();

      // Respond with user info and token
      res.status(200).json({
          _id: user._id,
          userName: user.userName,
          userEmail: user.userEmail,
          token,
      });
  } catch (error) {
      res.status(500).json({ message: 'Server error' });
  }
};


// @desc    Fetch all users
// @route   GET /api/users
// @access  Private
export const fetchUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.status(200).json(users);
});

// @desc    Update a user
// @route   PUT /api/users/:id
// @access  Private
export const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.userEmail = req.body.userEmail || user.userEmail;
    user.userPassword = req.body.userPassword || user.userPassword;

    const updatedUser = await user.save();
    res.status(200).json(updatedUser);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Delete a user
// @route   DELETE /api/users/:id
// @access  Private
export const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
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
  const user = await User.findById(req.user._id); // Assuming req.user is populated by the protect middleware

  if (user) {
    res.status(200).json({
      _id: user._id,
      userEmail: user.userEmail,
      // Include any other user fields you want to return
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});
