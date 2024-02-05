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

/* Get User */
export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      return res.status(200).json({
        msg: `Successfully fetched user`,
        user: user,
      });
    }
  } catch (error: any) {
    errorHandler(error, res);
  }
};

/* Delete User */
export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (user) {
      return res.status(200).json({
        msg: `Successfully deleted user`,
        user: user,
      });
    }
  } catch (error: any) {
    errorHandler(error, res);
  }
};
