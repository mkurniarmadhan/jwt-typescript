// src/app.ts
import express from "express";
import connectDB from "./config/db";

import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
const app = express();
const port = 8900;

// Middleware untuk parsing JSON
app.use(express.json());

// Koneksi ke MongoDB
connectDB();

// Rute otentikasi dan rute pengguna
app.use("/api", userRoutes);
app.use("/auth", authRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
