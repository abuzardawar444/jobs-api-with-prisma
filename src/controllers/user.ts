import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import db from "../utils/db";
import bcrypt from "bcryptjs";
import { BadRequestError, UnAuthenticatedError } from "../errors";
import crypto from "crypto";
import sendVerificationEmail from "../utils/sendVerificationEmail";
import { attackCookiesToResponse, createJWT } from "../utils/jwt";
import { createTokenUser } from "../utils/createTokenUser";
import sendResetPasswordEmail from "../utils/sendResetPasswordEmail";
import { createHash } from "../utils/createHash";

export const register = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  // token
  const verificationToken = crypto.randomBytes(40).toString("hex");
  const alreadyUser = await db.user.findUnique({ where: { email } });
  if (alreadyUser) {
    throw new BadRequestError("Email already exists");
  }
  const user: {
    username: string;
    email: string;
    password: string;
    verificationToken: string;
  } = await db.user.create({
    data: {
      username,
      email,
      password: hashedPassword,
      verificationToken,
      verified: new Date(),
      updatedAt: new Date(),
    },
  });
  // console.log(user);
  const origin = "http://localhost:5173";
  await sendVerificationEmail({ username, email, origin, verificationToken });
  res.status(StatusCodes.CREATED).json({ user });
};

export const verifyEmail = async (req: Request, res: Response) => {
  const { verificationToken, email } = req.body;
  const user = await db.user.findUnique({ where: { email } });
  if (!user) {
    throw new UnAuthenticatedError("Varification failed.");
  }
  if (user.verificationToken !== verificationToken) {
    throw new UnAuthenticatedError("Varification failed.");
  }
  await db.user.update({
    where: { email },
    data: {
      isVerified: true,
      verified: new Date(),
      verificationToken: "",
    },
  });
  res.status(StatusCodes.OK).json({ message: "email verified" });
};

export const login = async (req: Request, res: Response) => {
  const { email, password }: { email: string; password: string } = req.body;
  const user = await db.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new UnAuthenticatedError("Invalid credentials");
  }

  const isPasswordCorrect = await bcrypt.compare(password, user?.password);
  if (!isPasswordCorrect) {
    throw new UnAuthenticatedError("Invalid credentials");
  }

  if (!user.isVerified) {
    throw new UnAuthenticatedError("Please verify the email");
  }

  const token = createJWT({ userId: user.id, username: user.username });

  const tokenUser = await createTokenUser(user);
  let refreshToken = "";
  const existingToken = await db.token.findUnique({
    where: { userId: user.id },
  });
  if (existingToken) {
    const { isValid } = existingToken;
    if (!isValid) {
      throw new UnAuthenticatedError("Invalid Credentials");
    }

    refreshToken = existingToken.refreshToken;

    attackCookiesToResponse({
      res,
      user: { userId: tokenUser.userId, username: tokenUser.username },
      refreshToken,
    });
    res.status(StatusCodes.OK).json({ user: tokenUser });
    return;
  }
  refreshToken = crypto.randomBytes(40).toString();
  const userAgent = req.headers["user-agent"] || "";
  const ip: string = req.ip || "";
  const userToken = {
    refreshToken,
    ip,
    userAgent,
    user: { connect: { id: user.id } },
    isValid: true,
  };
  await db.token.create({ data: userToken });
  attackCookiesToResponse({
    res,
    user: { userId: tokenUser.userId, username: tokenUser.username },
    refreshToken,
  });
  res
    .status(StatusCodes.OK)
    .json({ user: { username: user.username, id: user.id }, token });
};

export const logout = async (req: Request, res: Response) => {
  const { userId } = req.user;
  await db.token.delete({
    where: {
      userId,
    },
  });
  res.cookie("refreshToken", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.cookie("accessToken", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ message: "User logged out" });
};

export const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;
  if (!email) {
    throw new BadRequestError("please provide your email");
  }
  const user = await db.user.findUnique({
    where: {
      email,
    },
  });
  // console.log(user);
  if (user) {
    const passwordToken = crypto.randomBytes(40).toString("hex");
    const origin = "http://localhost:3000";

    await sendResetPasswordEmail({
      passwordToken,
      origin,
      email: user.email,
      username: user.username,
    });

    const tenMinutes = 1000 * 60 * 10;
    const passwordTokenExpirationDate = new Date(Date.now() + tenMinutes);

    await db.user.update({
      where: { email },
      data: {
        passwordToken: createHash(passwordToken),
        passwordTokenExpirationDate,
      },
    });
  }
  res.status(StatusCodes.OK).json({ message: user });
};

export const resetPassword = async (req: Request, res: Response) => {
  const {
    passwordToken,
    email,
    password,
  }: { passwordToken: string; email: string; password: string } = req.body;
  if (!passwordToken || !email || !password) {
    throw new BadRequestError("Please provide all values");
  }
  const user = await db.user.findUnique({
    where: {
      email,
    },
  });
  if (!user) {
    throw new BadRequestError("No user found.");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  if (user) {
    const currentDate = new Date();
    if (
      user.passwordToken === passwordToken &&
      user.passwordTokenExpirationDate &&
      user.passwordTokenExpirationDate > currentDate
    ) {
      await db.user.update({
        where: {
          email,
        },
        data: {
          password: hashedPassword,
          passwordToken: null,
          passwordTokenExpirationDate: null,
        },
      });
    }
  }
  res
    .status(StatusCodes.OK)
    .json({ message: "Reset Password successfully..." });
};