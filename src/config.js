import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI;
    const dbName = process.env.DB_NAME;

    if (!mongoURI || !dbName) {
      throw new Error("MongoDB URI or DB name is missing in environment variables.");
    }

    const conn = await mongoose.connect(`${mongoURI}/${dbName}`);
    console.log(`MongoDB Connected... Host: ${conn.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
  }
};
