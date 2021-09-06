import express from "express";
import products from "./routes/products.js";
import dotenv from "dotenv";
import connectDB from "./db/connectDB.js";
import "colours";
import errorHandler from "./errors/errorHandler.js";
import userRoutes from "./routes/userRoutes.js";
import CustomError from "./errors/CustomError.js";

dotenv.config();
const app = express();
app.use(express.json());

connectDB();

app.get("/", (req, res) => {
  res.send("Api is running");
});
app.use("/api/products", products);
app.use("/api/users", userRoutes);

app.use("*", (req, res, next) => {
  console.log(`path${req}`.blue);
  throw new CustomError(404, "Not found");
});

app.use(errorHandler);
const port = process.env.PORT || 5000;
app.listen(port, () =>
  console.log(`Server serving at ${port} in ${process.env.NODE_ENV} mode`.cyan)
);
