/* Error Handler */

import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err);
  return res.status(500).json({
    msg: "Internal Server Error",
    error: err.message,
    status: 500,
    success: false,
  });
};
