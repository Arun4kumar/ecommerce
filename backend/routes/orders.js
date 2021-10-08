import express from "express";

import {
  postOrder,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
  getOrders,
  makeDelivered,
} from "../controllers/orderController.js";
import { protect, admin } from "../middleware/protect.js";
const router = express.Router();

router.route("/").post(protect, postOrder).get(protect, admin, getOrders);
router.route("/myorders").get(protect, getMyOrders);
router.route("/:id").get(protect, getOrderById).put(makeDelivered);
router.route("/:id/pay").put(protect, updateOrderToPaid);

export default router;
