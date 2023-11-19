import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  senderUsername: String,
  content: String,
  timestamp: { type: Date, default: Date.now }
});

export const userSchema = new mongoose.Schema({
  username: String,
  messages: { type: [messageSchema], default: [] }
});

export const User = mongoose.model("User", userSchema);
