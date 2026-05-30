import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ quiet: true });

const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGO_URI;

        if (!mongoURI) {
            throw new Error("MONGO_URI is not properly defined");
        }

        await mongoose.connect(mongoURI);

        console.log("MongoDB Connected");
    } catch (error) {
        console.error("MongoDB Connection Failed:", error);
        process.exit(1);
    }
};

export default connectDB;
