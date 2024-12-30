import { NextFunction, Request, Response } from "express";
import { UnAuthenticatedError } from "../errors";
import { isTokenValid } from "../utils/jwt";

export const authenticateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token: string = "";
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
  } else if (req.cookies.token) {
    token = req.cookies.token;
  }
  if (!token) {
    throw new UnAuthenticatedError("Authentication Invalid");
  }
  try {
    const payload = isTokenValid(token);
    req.user = {
      userId: payload,
    };
    console.log(console.log(req.user));
    next();
  } catch (error) {
    throw new UnAuthenticatedError("Invalid credentials");
  }
};
