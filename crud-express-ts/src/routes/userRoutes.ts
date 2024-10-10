// src/routes/userRoutes.ts
import { Router } from "express";
import { authenticateJWT } from "../middleware/auth";
import User from "../models/user";

const userRoutes = Router();

// Get Users
userRoutes.get("/users", authenticateJWT, async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// Find User by ID
userRoutes.get("/users/:id", authenticateJWT, async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).send("User not found");
  }
});

//  Buat user baru
userRoutes.post("/users", authenticateJWT, async (req, res) => {
  const newUser = new User(req.body);
  await newUser.save();
  res.status(201).json(newUser);
});

// Update User
userRoutes.put("/users/:id", authenticateJWT, async (req, res) => {
  const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (updatedUser) {
    res.json(updatedUser);
  } else {
    res.status(404).send("User not found");
  }
});

// Hapus User
userRoutes.delete("/users/:id", authenticateJWT, async (req, res) => {
  const deletedUser = await User.findByIdAndDelete(req.params.id);
  if (deletedUser) {
    res.status(204).send();
  } else {
    res.status(404).send("User not found");
  }
});

export default userRoutes;
