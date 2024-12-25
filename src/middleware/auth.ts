import { NextFunction, Request, Response } from "express";
import { UnAuthenticatedError } from "../errors";
import jwt, { JwtPayload } from "jsonwebtoken";
export const authMiddleWare = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new UnAuthenticatedError("Please login to access this route...");
    }
    const token = authHeader.split(" ")[1];
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new UnAuthenticatedError("Please login to access this route");
    }
    const decoded = jwt.verify(token, jwtSecret) as JwtPayload;
    console.log(decoded);
    next();
  } catch (error) {
    console.log(error);
    throw new UnAuthenticatedError("Invalid credentials..");
  }
};
