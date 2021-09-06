import mongoose from "mongoose";
const connetDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost/proshop", {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("connect to database".green.underline);
  } catch (error) {
    console.log(`Failed to connect to DB ${error.message}`.red);
  }
};
export default connetDB;
