import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import db from "../utils/db";
import { BadRequestError, UnAuthenticatedError } from "../errors";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import sendVerificationEmail from "../utils/sendVerificationEmail";

export const showCurrentUser = async (req: Request, res: Response) => {
  res.status(StatusCodes.OK).json({ user: req.user });
};

export const updateUserPassword = async (req: Request, res: Response) => {
  const { currentPassword, newPassword, email } = req.body;
  const user = await db.user.findUnique({
    where: { email },
  });
  if (!user) {
    throw new UnAuthenticatedError("Invalid credentials.");
  }
  const isPasswordCorrect = bcrypt.compare(currentPassword, user.password);
  if (!isPasswordCorrect) {
    throw new BadRequestError("Current password is in correct");
  }
  const verificationToken = crypto.randomBytes(40).toString("hex");
  await sendVerificationEmail({
    username: user.username,
    email: user.email,
    verificationToken,
    origin: "http://localhost:3000",
  });
  const verifiedUser = await db.user.update({
    where: { email },
    data: {
      verificationToken,
    },
  });

  res.status(StatusCodes.OK).json({ message: "Please check your email" });
};