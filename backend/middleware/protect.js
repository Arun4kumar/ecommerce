import jwt from "jsonwebtoken";
import User from "../db/model/User.js";
import asyncErrorsHandler from "../errors/asyncErrorsHandler.js";
import CustomError from "../errors/CustomError.js";
import colour from "colours";

const protect = asyncErrorsHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];

    try {
      const decoded = jwt.verify(token, process.env.SECRET);
      const user = await User.findById(decoded.id).select("-password");
      req.user = user;
      next();
    } catch (error) {
      throw error;
    }
  }
  if (!token) {
    throw new CustomError(400, "Provide Token");
  }
});

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    throw new CustomError(401, "Not Authorized");
  }
};
export { protect, admin };
