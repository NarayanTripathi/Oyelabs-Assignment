import express from "express";
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  loginUser
} from "../controllers/user.controller.js";
import { validateUserInput } from "../middlewares/validation.middleware.js";
import { authUser } from "../middlewares/authUser.middleware.js";

const router = express.Router();


router.post("/login", loginUser);


// Create a user with validation middleware
router.post("/", validateUserInput, createUser);

// Get all users
router.get("/", authUser, getAllUsers);

// Get user by ID
router.get("/:id", authUser, getUserById);

// Update user by ID with validation
router.put("/:id", authUser, updateUser);

// Delete user by ID
router.delete("/:id", authUser, deleteUser);

export default router;
