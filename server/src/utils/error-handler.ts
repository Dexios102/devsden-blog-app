/* Error Handler */
import { Request, Response, NextFunction } from "express";

export const errorHandler = (error: any, res: Response) => {
  console.error(error);
  return res.status(500).json({
    msg: "Internal Server Error",
    error: error.message,
    status: 500,
  });
};
