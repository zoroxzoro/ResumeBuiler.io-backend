import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import resumeRouter from "./routes/resume.routes.js";
import { clerkMiddleware } from "@clerk/express";
import userRoutes from "./routes/user.routes.js";
import { connectDB } from "./utils/db.js";

dotenv.config(); // Load environment variables early

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());

app.use(
  clerkMiddleware({
    publishableKey: process.env.VITE_CLERK_PUBLISHABLE_KEY,
    secretKey: process.env.SECRET_KEY, // Corrected the typo here
  })
);

app.use("/resume", resumeRouter);
app.use("/user", userRoutes);

app.listen(PORT, () => {
  // Use the PORT variable
  console.log(`Server is running on port ${PORT}`);
  connectDB(); // Call connectDB here after starting the server
});
