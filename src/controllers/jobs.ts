import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export const createJob = (req: Request, res: Response) => {
  res.status(StatusCodes.CREATED).json({ message: "create Post Route" });
};

export const getAllJobs = (req: Request, res: Response) => {
  res.status(StatusCodes.OK).json({ message: "get All jobs route" });
};

export const getSingleJob = (req: Request, res: Response) => {
  res.status(StatusCodes.OK).json({ message: "Get Single Job" });
};

export const deleteJob = (req: Request, res: Response) => {
  res.status(StatusCodes.OK).json({ message: "Delete Job Route" });
};

export const updateJob = (req: Request, res: Response) => {
  res.status(StatusCodes.OK).json({ message: "Update Job Route" });
};
