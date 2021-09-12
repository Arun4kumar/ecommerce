import express from "express";

import {
  authUser,
  getUserProfile,
  registerUser,
  updateUser,
  getUsers,
  deleteUser,
} from "../controllers/userControllers.js";
import { protect, admin } from "../middleware/protect.js";

const router = express.Router();

router.route("/:id").delete(protect, admin, deleteUser);
router.route("/").post(registerUser).get(protect, admin, getUsers);

router.route("/login").post(authUser);
router.route("/profile").get(protect, getUserProfile).put(protect, updateUser);

export default router;
