import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI); // process.env.MONGODB_URI is the connection string
         console.log(`MongoDB connected: ${conn.connection.host}`);    // conn.connection.host is the host of the connection
        
       
    } catch (error) {
        console.error("mogodb connection failed", error);  // log the error
    }
};