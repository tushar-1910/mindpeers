import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config.js";
import http from "http";
import { Server } from "socket.io";
import { createOrUpdateUser, addMessageToUser } from "./services.js";

export const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());
app.use(express.static("./public"));

const httpServer = http.createServer(app);

export const socketIO = new Server(httpServer);

// socket.io
socketIO.on("connection", (socket) => {
  console.log("User connected");

  socket.on("join", (userData) => {
    console.log(`${userData.username} joined`);

    createOrUpdateUser(userData);

    socket.join(userData.username);
  });

  socket.on("messageOutgoing", async (messageData) => {
    try {
      const { username, message } = messageData;

      addMessageToUser({ username, message });

      // Broadcast the message to the room
      socket.broadcast.emit("messageIncoming", messageData);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

const port = process.env.PORT || 4001;
connectDB().then(() => {
  httpServer.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
});
