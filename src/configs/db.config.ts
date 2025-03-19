import mongoose from "mongoose";
import dotenv from "dotenv";

// Load biến môi trường từ .env
dotenv.config(); 

export const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI;
    
    if (!mongoUri) {
      throw new Error("⚠️ Missing MONGO_URI in .env file!");
    }

    await mongoose.connect(mongoUri);
    console.log("✅ MongoDB connected successfully!");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  }
};
