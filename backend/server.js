import express from "express";
import products from "./routes/products.js";
import dotenv from "dotenv";
import connectDB from "./db/connectDB.js";
import path from "path";
import "colours";
import errorHandler from "./errors/errorHandler.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orders.js";
import CustomError from "./errors/CustomError.js";

dotenv.config();
const app = express();
app.use(express.json());

connectDB();

app.use("/api/products", products);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.get("/api/config/paypal", (req, res) => res.send(process.env.PAYPAL));

const __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("api is running");
  });
}

app.use("*", (req, res, next) => {
  throw new CustomError(404, "Not found");
});

app.use(errorHandler);
const port = process.env.PORT || 5000;
app.listen(port, () =>
  console.log(`Server serving at ${port} in ${process.env.NODE_ENV} mode`.cyan)
);
