import express from 'express';
import { fetchUsers, registerUser, loginUser, updateUser, deleteUser, getUserProfile } from '../controller/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const route = express.Router();

route.post("/register", registerUser);
route.post("/login", loginUser);
route.get("/getAllUsers", fetchUsers);
route.put("/update/:id", protect, updateUser); // Ensure this line is included and protected
route.delete("/delete/:id", protect, deleteUser);
route.get('/profile', protect, getUserProfile); // Ensure this line is included
export default route;
