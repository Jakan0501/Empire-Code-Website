import express from 'express';
import { fetchUsers, registerUser, loginUser, updateUser, deleteUser, getUserProfile } from '../controller/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const route = express.Router();

route.post("/register", registerUser);
route.post("/login", loginUser);
route.get("/getAllUsers", fetchUsers);
route.put("/update/:id", updateUser);
route.delete("/delete/:id", deleteUser);
route.get('/profile', protect, getUserProfile); // Ensure this line is included
export default route;
