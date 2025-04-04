// src/db.ts
import mongoose from "mongoose";

export const connectDB = async () => {
    const mongoUri = process.env.MONGODB_URI || "mongodb://localhost:27017/ginosize"
    mongoose.connect(mongoUri)
        .then(() => console.log("✅ MongoDB connected successfully!"))
        .catch(err => console.error("❌ MongoDB connection error:", err));
};
