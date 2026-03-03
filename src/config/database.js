import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDB = async (url, db) => {
    try {
        const conn = await mongoose.connect(
            url,
            {
                dbName: db
            }
        );
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(`Error: ${error.message}`);
    }
}