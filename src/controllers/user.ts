import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import db from "../utils/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UnAuthenticatedError } from "../errors";

export const register = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await db.user.create({
    data: {
      username,
      email,
      password: hashedPassword,
    },
  });
  res.status(StatusCodes.CREATED).json({ user });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await db.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new UnAuthenticatedError("Invalid credentials");
  }
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    throw new UnAuthenticatedError("Your jwt secret is invalid");
  }
  const token = jwt.sign(
    { username: user?.username, email: user?.email, id: user?.id },
    jwtSecret,
    { expiresIn: "1d" }
  );

  const isPasswordCorrect = await bcrypt.compare(password, user?.password);
  if (!isPasswordCorrect) {
    throw new UnAuthenticatedError("Invalid credentials");
  }
  res
    .status(StatusCodes.OK)
    .json({ user: { username: user.username, id: user.id }, token });
};
