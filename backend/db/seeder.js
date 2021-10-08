import mongoose from "mongoose";
import Product from "./model/Product.js";
import dotenv from "dotenv";
import users from "../data/users.js";
import "colours";
import Order from "./model/Order.js";
import products from "../data/products.js";
import User from "./model/User.js";
import connectDB from "./connectDB.js";

dotenv.config();
connectDB();

const importData = async () => {
  try {
    await Product.deleteMany();
    await User.deleteMany();
    await Order.deleteMany();

    let admin = null;

    for (let user of users) {
      const userNew = new User(user);
      const recieved = await userNew.save();
      if (admin === null) {
        admin = recieved;
      }
    }

    const Admin = admin._id;
    const sampleProducts = products.map((product) => {
      console.log(product);
      return { ...product, user: Admin };
    });
    await Product.insertMany(sampleProducts);
    console.log(`Recarnated database`.green.inverse);
    process.exit();
  } catch (error) {
    console.log(`something went wrong seeding ${error.message}`);
    process.exit(1);
  }
};
const destroyData = async () => {
  try {
    await Product.deleteMany();
    await User.deleteMany();
    await Order.deleteMany();

    console.log(`Database Destroyed`.red.inverse);
    process.exit();
  } catch (error) {
    console.log(`something went wrong seeding ${error.message}`.red);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
