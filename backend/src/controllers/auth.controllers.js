import { generateToken } from '../lib/utlis.js';
import User from '../models/user.models.js';
import bcrypt from 'bcryptjs';
import cloudinary from '../lib/cloudnary.js';

export const signup = async (req, res) => {
    const { fullname ,email, password } = req.body;     // get the email and password from the request body
    try {
        if (!fullname || !email || !password) {     // check if the email and password are provided
            return res.status(400).json({ message: "All fields are required" }); }
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters long" });
        }
        const user = await User.findOne({ email });     // find the user by email
        if (user) return res.status(400).json({ message: "Email already exists" });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        const newUser = new User({ fullname, email, password: hashedPassword });

        if (newUser) {
            await newUser.save();
            generateToken(newUser._id, res);    // generate token
               // save the user

            res.status(201).json({  // send the response
                _id: newUser._id,   // send the user id
                fullname: newUser.fullname,     // send the user name
                email: newUser.email,           // send the user email
                profilePic: newUser.profile     // send the user profile picture
            })
        } else {
            return res.status(400).json({message: "User not created"});
        }
    } catch (error) {
        console.error("signup failed", error.message);
        return res.status(500).json({ message: "Internal server error" });

}
};
export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({email});
        if (!user) return res.status(400).json({message: "Invalid credentials"});
        const ifpasswordMatch = await bcrypt.compare(password, user.password);
        if (!ifpasswordMatch) return res.status(400).json({message: "Invalid credentials"});
        generateToken(user._id, res);
        res.status(200).json({
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            profilePic: user.profilePic
        });
    }
    catch(error) {
        console.error("login failed", error.message);
        return res.status(500).json({ message: "Internal server error" });

    }
}

export const logout = async (req, res) => {
    try {
        res.clearCookie("jwt");
        res.status(200).json({message: "Logout successful"});
    } catch (error) {
        console.error("logout failed", error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const updateProfile = async (req, res) => {
    try{
        const {profilePic} = req.body;
        const userId = req.user._id;
        if (!profilePic) return res.status(400).json({message: "Profile picture is required"});
        
        const uploadResponse = await cloudinary.uploader.upload(profilePic) 
            const updateUser = await User.findByIdAndUpdate(userId, {profilePic: uploadResponse.secure_url}, 
                {new: true}); 
            res.status(200).json({updateUser});
    } catch (error) {
        console.error("updateProfile failed", error);
        return res.status(500).json({ message: "Internal server error" });
    }}

export const checkAuth = async (req, res) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.error("checkAuth failed", error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
}