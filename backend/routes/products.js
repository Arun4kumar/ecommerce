import express from "express";
import Product from "../db/model/Product.js";
import asyncErrorsHandler from "../errors/asyncErrorsHandler.js";
import CustomError from "../errors/CustomError.js";
const router = express.Router();

router.get(
  "/",
  asyncErrorsHandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products);
  })
);
router.get(
  "/:id",
  asyncErrorsHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
      throw new CustomError(404, "Product not found");
    }
    res.json(product);
  })
);

export default router;
