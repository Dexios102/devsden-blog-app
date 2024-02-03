import User from "../models/user-model";
import { Request, Response, NextFunction } from "express";
import { errorHandler } from "../utils/error-handler";

/* Get All Users */
export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await User.find();
    if (users) {
      return res.status(200).json({
        msg: `Successfully fetched ${users.length} users`,
        users: users,
      });
    }
  } catch (error: any) {
    errorHandler(error, res);
  }
};
