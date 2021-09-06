import jwt from "jsonwebtoken";
import User from "../db/model/User.js";
import asyncErrorsHandler from "../errors/asyncErrorsHandler.js";
import CustomError from "../errors/CustomError.js";

const protect = asyncErrorsHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.autherization &&
    req.headers.autherization.startsWith("Bearer")
  ) {
    token = req.headers.autherization.split(" ")[1];

    try {
      const decoded = jwt.verify(token, process.env.SECRET);
      const user = await User.findById(decoded.id).select("-password");

      req.user = user;
      console.log("protect worked");
      next();
    } catch (error) {
      throw error;
    }
  }
  if (!token) {
    throw new CustomError(400, "Provide Token");
  }
});
export { protect };
