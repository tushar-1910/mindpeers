import { io } from "../utils/server";

io.on("connection", (socket) => {
  console.log("User connected");

  socket.on("joinRoom", (userData) => {
    console.log(`${userData.username} joined the room`);
    socket.join(userData.username);
  });

  socket.on("sendMessage", async (messageData) => {
    try {
      const { senderUsername, message } = messageData;
      // Broadcast the message to the room
      socket.broadcast.emit("receiveMessage", messageData);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});
