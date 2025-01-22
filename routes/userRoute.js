import express from 'express';
import {fetch, create, update, deleteUser, register, login } from '../controller/userController.js';

const route = express.Router();


route.post("/create", create);
route.post("/register", register);
route.post("/login", login); // Add login route
//route.get("/fetch", fetch);
route.get("/getAllUsers", fetch);
route.put("/update/:id", update);
route.delete("/delete/:id", deleteUser);
export default route; 