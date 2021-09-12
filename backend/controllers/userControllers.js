import asyncErrorsHandler from "../errors/asyncErrorsHandler.js";
import User from "../db/model/User.js";
import CustomError from "../errors/CustomError.js";
import "colours";

const authUser = asyncErrorsHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user == null) {
    res.status(404);
    throw new Error("Invalid email or password");
  }
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: user.getjsonwebtoken(),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

const getUserProfile = asyncErrorsHandler(async (req, res, next) => {
  console.log("get route sucess".yellow);
  res.json(req.user);
});

const registerUser = asyncErrorsHandler(async (req, res, next) => {
  const details = req.body;

  const user = await User.create(details);
  res.status(201).json(user);
});

const updateUser = asyncErrorsHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  console.log("inside update".red, req.body);
  if (user) {
    user.email = req.body.email;
    user.name = req.body.name;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const temp = await user.save();
    console.log("updated user", user);
  } else {
    throw new CustomError(404, "User Not Found");
  }
});

//@desc Get All Users
// protected

const getUsers = asyncErrorsHandler(async (req, res, next) => {
  const users = await User.find({});
  res.json(users);
});

const deleteUser = asyncErrorsHandler(async (req, res, next) => {
  console.log(req.params.id);
  const users = await User.findByIdAndDelete(req.params.id);
  res.json({ message: "Successfully removed user" });
});

export {
  authUser,
  getUserProfile,
  registerUser,
  updateUser,
  getUsers,
  deleteUser,
};
