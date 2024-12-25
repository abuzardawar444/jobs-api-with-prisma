import { NextFunction, Request, Response } from "express";
import { UnAuthenticatedError } from "../errors";
import jwt, { JwtPayload } from "jsonwebtoken";

declare module "express-serve-static-core" {
  interface Request {
    user?: JwtPayload;
  }
}

export const authMiddleWare = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnAuthenticatedError("Please login to access this route...");
  }
  const token = authHeader.split(" ")[1];

  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    throw new UnAuthenticatedError("Please login to access this route");
  }

  try {
    const payload = jwt.verify(token, jwtSecret) as JwtPayload;
    const { username, email, id } = payload as {
      username: string;
      email: string;
      id: string;
    };
    req.user = { username, email, id };
    next();
  } catch (error) {
    console.log(error);
    throw new UnAuthenticatedError("Invalid credentials..");
  }
};
