import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// @desc    Create a new user
// @route   POST /api/users
export const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(409).json({ message: "User already exists" });
    
    // Create a new user
    const user = await User.create({ name, email, password });

    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
};


// @desc    Get all users
// @route   GET /api/users
export const getAllUsers = async (req, res) => {
    try {
      const { page = 1, limit = 5 } = req.query;  // <-- extracting page & limit from query params, defaults: page=1 & limit=5
  
      const users = await User.find()
        .skip((page - 1) * limit)                // <-- skip calculation: (page-1) * limit
        .limit(parseInt(limit));                 // <-- limit results to 'limit' number of users
  
      const total = await User.countDocuments(); // <-- total number of users (useful for frontend pagination UI)
  
      res.status(200).json({
        users,
        total,
        page: parseInt(page),
        limit: parseInt(limit),
      });
    } catch (err) {
      res.status(500).json({ message: "Error fetching users", error: err.message });
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

    if (!name && !email) {
      return res.status(400).json({ error: "Name or email is required." });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, email },
      { new: true,}
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


// @desc    Login a user
// @route   POST /api/users/login
export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) return res.status(401).json({ error: "Invalid credentials." });
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(401).json({ error: "Invalid credentials." });
  
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
  
      // Set the token in HTTP-only cookie
      res
        .cookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production", // secure for HTTPS
          sameSite: "strict",
          maxAge: 24 * 60 * 60 * 1000, // 1 day
        })
        .status(200)
        .json({ message: "Login successful." });
    } catch (error) {
      res.status(500).json({ error: "Internal server error." });
    }
};
  
