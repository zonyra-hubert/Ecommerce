import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error(`ERROR ${error.message}`);
    process.exit(1);
  }
  console.log("PORT:", process.env.PORT);
  console.log("MONGO_URI:", process.env.MONGO_URI);
};
export default connectDB;
