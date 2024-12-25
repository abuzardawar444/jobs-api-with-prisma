import { NextFunction, Request, Response } from "express";
import { CustomAPIError } from "../errors/index.js";
import { StatusCodes } from "http-status-codes";

const errorHandlerMiddleWare = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomAPIError) {
    res
      .status(err?.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: err.message });
    return;
  }
  res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ message: "Internal Server Error" });
  return;
};

export default errorHandlerMiddleWare;
