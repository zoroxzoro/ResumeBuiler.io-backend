import express from "express";
import { requireAuth } from "@clerk/express";
import { createUser } from "../controller/user.controller.js";

const router = express.Router();

router.post("/create", requireAuth(), createUser);

export default router;
