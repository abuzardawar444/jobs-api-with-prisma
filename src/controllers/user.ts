import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export const register = (req: Request, res: Response) => {
  res.status(StatusCodes.CREATED).json({ message: "Register Route" });
};

export const login = (req: Request, res: Response) => {
  res.status(StatusCodes.OK).json({ message: "Login Route" });
};
