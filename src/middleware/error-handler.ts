import { NextFunction, Request, Response } from "express";
import { CustomAPIError } from "../errors";
import { StatusCodes } from "http-status-codes";

const errorHanlderMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomAPIError) {
    console.log(err.statusCode);
    res
      .status(err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: err.message });
    return;
  }
  res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ message: "Internal Server Error" });
};

export default errorHanlderMiddleware;
