import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    message: {
        type: String,
    },
    Image: {
        type: String,  
    },
},
    { timestamps: true}    // timestamps: true will automatically add createdAt and updatedAt fields to the schema
);

const Message = mongoose.model("Message", messageSchema);    // create a model User from the schema userSchema

export default Message;  // export the model User