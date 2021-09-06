import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false, required: true },
  },
  {
    timestamps: true,
  }
);
userSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);

  this.password = await bcrypt.hash(this.password, salt);
});
userSchema.methods.matchPassword = async function (data) {
  return await bcrypt.compare(data, this.password);
};

userSchema.methods.getjsonwebtoken = function () {
  return jwt.sign({ id: this._id }, process.env.SECRET, {
    expiresIn: "30d",
  });
};
const User = mongoose.model("users", userSchema);

export default User;
