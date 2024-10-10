import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { IUser } from "../models/user"; // Sesuaikan path dengan model User
import { log } from "console";

const secretKey = "rahasia";

export const authenticateJWT = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];
  console.log(token);

  if (!token) {
    return res.status(403).json({ message: "Token tidak diberikan" });
  }

  try {
    const decoded = jwt.verify(token, secretKey) as IUser;
    (req as any).user = decoded;
    console.log("Decoded Token:", decoded);
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token tidak valid" });
  }
};
