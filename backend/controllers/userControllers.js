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

const getUserProfile = asyncErrorsHandler(async (req, res) => {
  res.json(req.user);
});

const registerUser = asyncErrorsHandler(async (req, res) => {
  const details = req.body;

  const user = await User.create(details);
  res.status(201).json(user);
});

const updateUser = asyncErrorsHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  console.log(user);
  console.log(req);
  if (user) {
    user.email = req.body.email;
    user.name = req.body.name;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const temp = await user.save();
    res.json({ message: "PROFILE UPDATED!" });
  } else {
    throw new CustomError(404, "User Not Found");
  }
});

//@desc Get All Users
// protected

const getUsers = asyncErrorsHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

const deleteUser = asyncErrorsHandler(async (req, res) => {
  console.log(req.params.id);
  const users = await User.findByIdAndDelete(req.params.id);
  res.json({ message: "Successfully removed user" });
});
const getUser = asyncErrorsHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (!user) {
    throw new CustomError(404, "User doesn't Exists");
  }
  res.json(user);
});

const updateUserAdmin = asyncErrorsHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    throw new CustomError(404, "User doesn't Exists");
  }
  console.log(req.body);
  user.email = req.body.email;
  user.name = req.body.name;
  if (req.body.password) {
    user.password = req.body.password;
  } else {
    user.password = user.password;
  }

  const temp = await user.save();
  res.json({ message: "Successfully Updated User" });
});

export {
  authUser,
  getUserProfile,
  registerUser,
  updateUser,
  getUsers,
  deleteUser,
  getUser,
  updateUserAdmin,
};
