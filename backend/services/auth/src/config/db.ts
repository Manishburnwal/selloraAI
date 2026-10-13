import mongoose from "mongoose";

export const connectDb = async () =>{
    try {
        await mongoose.connect(process.env.MONGODB_URL!)
        console.log("MongoDB Connected")
    } catch (error) {
        console.log("Error connecting to MongoDB:",error)
    }
}