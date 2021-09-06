import express from "express";

import {
  authUser,
  getUserProfile,
  registerUser,
  updateUser,
} from "../controllers/userControllers.js";
import { protect } from "../middleware/protect.js";

const router = express.Router();

router.route("/login").post(authUser);
router.route("/profile").get(protect, getUserProfile).put(protect, updateUser);
router.route("/").post(registerUser);

export default router;
