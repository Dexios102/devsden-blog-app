import User from "../models/user-model";
import { Request, Response, NextFunction } from "express";

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
        users: users,
        msg: `Successfully fetched ${users.length} users`,
        status: 200,
      });
    }
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({
      msg: "Internal Server Error",
      error: error.message,
      status: 500,
    });
  }
};
