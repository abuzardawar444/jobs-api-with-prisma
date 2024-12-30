import { NextFunction, Request, Response } from "express";
import { attackCookiesToResponse, isTokenValid } from "../utils/jwt";
import { UnAuthenticatedError } from "../errors";
import db from "../utils/db";
import { JwtPayload } from "jsonwebtoken";

declare module "express-serve-static-core" {
  interface Request {
    user: JwtPayload;
  }
}

export const authenticationMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { refreshToken, accessToken } = req.signedCookies;
  try {
    if (accessToken) {
      const payload = isTokenValid(accessToken);
      req.user = payload;
      return next();
    }
    const payload = isTokenValid(refreshToken);

    const existingToken = await db.token.findUnique({
      where: {
        userId: payload.user.userId,
        refreshToken: payload.refreshToken,
      },
    });
    if (!existingToken || !existingToken?.isValid) {
      throw new UnAuthenticatedError("Authentication Invalid");
    }
    console.log(payload);
    attackCookiesToResponse({
      res,
      user: payload.user,
      refreshToken: existingToken.refreshToken,
    });
    req.user = payload;
    next();
  } catch (error) {
    throw new UnAuthenticatedError("Authentication Invalid");
  }
};
