import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export const showCurrentUser = async (req: Request, res: Response) => {
  res.status(StatusCodes.OK).json({ user: req.user });
};
