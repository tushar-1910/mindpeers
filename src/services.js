import { User } from "./model.js";

export const createOrUpdateUser = async (userData) => {
  try {
    const { username } = userData;
    const existingUser = await User.findOne({ username: username });

    if (!existingUser) {
      const newUser = await User.create({ username: username });
      await newUser.save();

      if (newUser) {
        localStorage.setItem("currentUser", newUser.id);
        return false;
      } else {
        return "User neither already exists nor created anew";
      }
    } else {
      localStorage.setItem("currentUser", existingUser.id);
      return true;
    }
  } catch (error) {
    console.error("Error creating or updating user:", error);
    return "Error";
  }
};

export const addMessageToUser = async (messageData) => {
  try {
    const { username, message } = messageData;
    const chatMessage = { username: username, message: message };

    const user = await User.findOne({ username: username });

    if (user) {
      user.chats.push(chatMessage);
      await user.save();
      return true;
    } else {
      return "User not found";
    }
  } catch (error) {
    console.error("Error updating user with message:", error);
    return "Error";
  }
};
