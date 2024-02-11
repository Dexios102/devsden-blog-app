import User from "../models/user-model";
import { Request, Response, NextFunction } from "express";
import { errorHandler } from "../utils/error-handler";
import bcrypt from "bcrypt";

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
    const userId = req.params.id;
    if (res.locals.jwtData.id !== userId) {
      return res.status(403).json({
        msg: "Unauthorized: You don't have permission to delete this user",
        status: 403,
      });
    }
    const user = await User.findByIdAndDelete(userId);
    if (user) {
      return res.status(200).json({
        msg: `Successfully deleted user`,
        user: user,
      });
    } else {
      return res.status(404).json({
        msg: `User not found`,
        status: 404,
      });
    }
  } catch (error: any) {
    errorHandler(error, res);
  }
};

/* Update User Information */
export const updateUserInfo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, profilePic, bio } = req.body;
  const userId = req.params.id;
  if (res.locals.jwtData.id !== userId) {
    return res.status(403).json({
      msg: "Unauthorized: You don't have permission to update this user",
      status: 403,
    });
  }
  if (username) {
    if (username.length < 7 || username.length > 20) {
      return res.status(403).json({
        msg: "Username must be between 7 and 20 characters",
        status: 403,
      });
    }
    if (username.includes(" ")) {
      return res.status(403).json({
        msg: "Username cannot contain spaces",
        status: 403,
      });
    }
    if (username !== req.body.username.toLowerCase()) {
      return res.status(403).json({
        msg: "Username cannot be changed",
        status: 403,
      });
    }
    if (!username.match(/^[a-zA-Z0-9]+$/)) {
      return res.status(403).json({
        msg: "Username must only contain letters and numbers",
        status: 403,
      });
    }
  }
  try {
    const user = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          username: username,
          profilePic: profilePic,
          bio: bio,
        },
      },
      { new: true }
    );
    if (user) {
      return res.status(200).json({
        msg: `Successfully updated user`,
        userData: user,
      });
    } else {
      return res.status(404).json({
        msg: `User not found`,
        status: 404,
      });
    }
  } catch (error: any) {
    errorHandler(error, res);
    console.log(error.message);
  }
};

export const updateUserPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { newPassword, confirmPassword } = req.body;
  const userId = req.params.id;
  try {
    if (res.locals.jwtData.id !== userId) {
      return res.status(403).json({
        msg: "Unauthorized: You don't have permission to update this user's password",
        status: 403,
      });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        msg: "User not found",
        status: 404,
      });
    }
    if (!newPassword || newPassword.trim().length < 6) {
      return res.status(400).json({
        msg: "New password must be at least 6 characters long",
        status: 400,
      });
    }
    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        msg: "New passwords do not match",
        status: 400,
      });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    return res.status(200).json({
      msg: "Successfully updated user password",
      user: user,
    });
  } catch (error: any) {
    errorHandler(error, res);
  }
};
