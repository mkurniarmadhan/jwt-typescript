// src/routes/authRoutes.ts
import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user";
const authRoutes = Router();

const secretKey = "rahasia";

// Daftar
authRoutes.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  // Simpan pengguna baru
  const newUser = new User({ name, email, password: hashedPassword });
  await newUser.save();

  res.status(201).json({ message: "User created" });
});

// Login
authRoutes.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Cek apakah pengguna ada
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // Verifikasi password
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return res.status(401).json({ message: "Invalid password" });
  }

  // Buat token JWT
  const token = jwt.sign({ id: user._id, email: user.email }, secretKey, {
    expiresIn: "1h",
  });

  res.status(200).json({ token });
});

export default authRoutes;
