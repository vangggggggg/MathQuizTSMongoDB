import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./configs/db.config";
import userRoutes from "./routes/user.routes";

dotenv.config();
const app = express();

// Kết nối Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);

// Lắng nghe cổng
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server is running on port ${PORT}`));
