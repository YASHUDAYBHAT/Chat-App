import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    fullname: {
        type: String,
        required: true,
    },  
    profilePic: {
        type: String,
        default: "",
    },
    },
    { timestamps: true,}    // timestamps: true will automatically add createdAt and updatedAt fields to the schema
);

const User = mongoose.model("User", userSchema);    // create a model User from the schema userSchema

export default User;  // export the model User