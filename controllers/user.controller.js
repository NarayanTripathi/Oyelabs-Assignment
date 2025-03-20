import { User } from "../models/user.model.js";


// @desc    Create a new user
// @route   POST /api/users
export const createUser = async (req, res) => {
  try {
    const { name, email } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "User with this email already exists." });
    }

    // Create new user
    const newUser = await User.create({ name, email });
    return res.status(201).json({ message: "User created successfully.", user: newUser });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
};


// @desc    Get all users
// @route   GET /api/users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json({ users });
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
};

// @desc    Get a user by ID
// @route   GET /api/users/:id
export const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    return res.status(200).json({ user });
  } catch (error) {
    console.error("Error fetching user:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
};

// @desc    Update a user by ID
// @route   PUT /api/users/:id
export const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const { name, email } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, email },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found." });
    }

    return res.status(200).json({ message: "User updated successfully.", user: updatedUser });
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
};

// @desc    Delete a user by ID
// @route   DELETE /api/users/:id
export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ error: "User not found." });
    }

    return res.status(200).json({ message: "User deleted successfully." });
  } catch (error) {
    console.error("Error deleting user:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
};
