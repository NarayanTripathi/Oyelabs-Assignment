import express from "express";
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";
import { validateUserInput } from "../middlewares/validation.middleware.js";

const router = express.Router();

// Create a user with validation middleware
router.post("/", validateUserInput, createUser);

// Get all users
router.get("/", getAllUsers);

// Get user by ID
router.get("/:id", getUserById);

// Update user by ID with validation
router.put("/:id", validateUserInput, updateUser);

// Delete user by ID
router.delete("/:id", deleteUser);

export default router;
