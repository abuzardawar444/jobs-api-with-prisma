import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

const NotFound = (req: Request, res: Response) => {
  res
    .status(StatusCodes.NOT_FOUND)
    .json({ message: "Route doesn't exists..." });
  return;
};

export default NotFound;
