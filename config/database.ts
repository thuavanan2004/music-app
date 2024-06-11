import mongoose from "mongoose";

const connect = async () => {
  try {
    const mongoUrl = process.env.MONGO_URL || "";
    await mongoose.connect(mongoUrl);
    console.log("Database connection successful");
  } catch {
    console.log("Database connection failed");
  }
};

export default connect;
