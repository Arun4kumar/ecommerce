import express from "express";
import { protect, admin } from "../middleware/protect.js";
import {
  getProducts,
  deleteProduct,
  getProduct,
  updateProduct,
  createProduct,
  addReview,
  getTopProducts,
} from "../controllers/productController.js";
const router = express.Router();
router.route("/").get(getProducts).post(protect, admin, createProduct);
router.route("/:id/review").post(protect, addReview);
router.get("/top", getTopProducts);
router
  .route("/:id")
  .get(getProduct)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct);

export default router;
