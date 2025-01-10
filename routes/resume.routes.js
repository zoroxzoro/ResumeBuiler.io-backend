import express from "express";
import {
  createResume,
  deleteResume,
  getResumeById,
  getResumesByUser,
  updateResume,
} from "../controller/resume.controller.js";
const router = express.Router();

router.post("/create", createResume);

router.get("/:_id", getResumeById);
router.get("/user/:clerkId", getResumesByUser);
router.put("/:id", updateResume);
router.delete("/:id", deleteResume);

export default router;
