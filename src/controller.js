import { User } from "../model.js";

export const createUser = async (userData) => {
  try {
    const { username } = userData;
    const existingUser = await User.findOne({ username: username });

    if (!existingUser) {
      const newUser = await User.create({ username: username });
      await newUser.save();

      if (newUser) {
        return false; // Indicate that a new user was created
      } else {
        return "User neither already exists nor was created";
      }
    } else {
      return true; // Indicate that the user already exists
    }
  } catch (error) {
    console.error("Error creating user:", error);
    return "Error creating user";
  }
};
