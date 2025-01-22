import User from '../models/userModel.js';

export const create = async (req, res) => {
    try {
        const userData = new User(req.body);
        const {userEmail}= userData;
        const userExit = await User.findOne({userEmail});
        if (userExit){
            return res.status(400).json({message:"User already exist"});
        }
        const savedUser = await userData.save();
        res.status(200).json(savedUser);
        
    } catch (error) {
        res.status(500).json({message:"Server Error"});
    }
}

export const fetch = async (req, res) => {
    try {
        const users = await User.find();
        if(users.length === 0) {
            return res.status(404).json({message:"No user found"});
        }
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({message:"Server Error"});
    }
}

export const update = async (req, res) => {
    try {
        const id = req.params.id;
        const userExit = await User.findById({_id:id});
        if (!userExit){
            return res.status(404).json({message:"User not found"});
        }
        const updatedUser = await User.findByIdAndUpdate(id, req.body, {new:true});
        res.status(201).json(updatedUser);
    } catch (error) {
        res.status(500).json({message:"Server Error"});
    }

}

export const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        const userExit = await User.findById({_id: id});
        if (!userExit){
            return res.status(404).json({message:"User not found"});
        }
        await User.findByIdAndDelete(id);
        res.status(201).json({message:"User deleted successfully"});
    } catch (error) {
        res.status(500).json({message:"Server Error"});
    }
}










export const register = async (req, res) => {
    try {
        const { userEmail, userPassword } = req.body;

        // Check if user already exists
        const userExists = await User.findOne({ userEmail });
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Create a new user without hashing the userPassword
        const userData = new User({
            userEmail,
            userPassword, // Store the userPassword as is
        });

        const savedUser = await userData.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};



export const login = async (req, res) => {
    try {
        const { userEmail, userPassword } = req.body;

        // Check if user exists
        const user = await User.findOne({ userEmail });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Check if userPassword matches
        if (user.userPassword !== userPassword) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Successful login
        res.status(200).json({ message: "Login successful", user });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};