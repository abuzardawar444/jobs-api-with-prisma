import jwt, { JwtPayload } from "jsonwebtoken";
import { Response } from "express";

export const createJWT = (payload: {
  userId: string;
  username: string;
  refreshToken?: string;
}) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: "1d" });
  return token;
};

export const isTokenValid = (token: string) =>
  jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

export const attackCookiesToResponse = async ({
  res,
  user,
  refreshToken,
}: {
  res: Response;
  user: { userId: string; username: string };
  refreshToken: string;
}) => {
  const accessTokenJWT = createJWT(user);
  const refreshTokenJWT = createJWT({ ...user, refreshToken });

  const oneDay = 1000 * 60 * 60;
  const longExp = 1000 * 60 * 60 * 24 * 7;
  res.cookie("accessToken", accessTokenJWT, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    signed: true,
    expires: new Date(Date.now() + oneDay),
  });
  res.cookie("refreshToken", refreshTokenJWT, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    signed: true,
    expires: new Date(Date.now() + longExp),
  });
};
