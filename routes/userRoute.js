import express from 'express';
import { fetchUsers, registerUser, loginUser, updateUser, deleteUser, getUserProfile, uploadProfilePicture, getProfilePicture, uploadMiddleware } from '../controller/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/getAllUsers", fetchUsers);
router.put("/update/:id", protect, updateUser);
router.delete("/delete/:id", protect, deleteUser);
router.get('/profile', protect, getUserProfile);

// Profile Picture Upload
router.post('/upload/:id', protect, uploadMiddleware, uploadProfilePicture);
router.get('/uploads/:filename', getProfilePicture);

export default router;
