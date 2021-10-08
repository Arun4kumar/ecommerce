import express from "express";

import {
  authUser,
  getUserProfile,
  registerUser,
  updateUser,
  getUsers,
  deleteUser,
  updateUserAdmin,
  getUser,
} from "../controllers/userControllers.js";
import { protect, admin } from "../middleware/protect.js";

const router = express.Router();
router.route("/profile").get(protect, getUserProfile).put(protect, updateUser);
router
  .route("/:id")
  .get(protect, admin, getUser)
  .delete(protect, admin, deleteUser)
  .put(protect, admin, updateUserAdmin);
router.route("/").post(registerUser).get(protect, admin, getUsers);

router.route("/login").post(authUser);

export default router;
