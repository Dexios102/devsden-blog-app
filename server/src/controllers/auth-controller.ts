import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";

import User from "../models/user-model";
import { errorHandler } from "../utils/error-handler";
import { generateTokenCookie } from "../utils/generateTokenCookie";
import { GoogleAuthRequest, SignUpRequest } from "../utils/types";
import { clearCookie } from "../utils/clearCookie";

export const googleAuth = async (
  req: Request<{}, {}, GoogleAuthRequest>,
  res: Response,
  next: NextFunction
) => {
  const { username, email, profilePic }: any = req.body;
  try {
    const userExisted = await User.findOne({ email: email });
    if (userExisted) {
      return res.status(200).json({
        msg: `User ${email} already exists`,
        status: 200,
      });
    }
    const autoPassword = Math.random().toString(36).slice(-8);
    const hashedPassword = await bcrypt.hash(autoPassword, 10);
    const user = new User({
      username:
        username.toLowerCase().split(" ").join("_") +
        Math.random().toString(9).slice(-3),
      email: email,
      password: hashedPassword,
      profilePic: profilePic,
    });
    await user.save();
    clearCookie(res);
    generateTokenCookie(user, res);
    res.status(200).json({
      msg: "Login successful",
      username: user.username,
      email: user.email,
      profilePic: user.profilePic,
    });
  } catch (error: any) {
    errorHandler(error, res);
  }
};

export const userSignUp = async (
  req: Request<{}, {}, SignUpRequest>,
  res: Response,
  next: NextFunction
) => {
  const { username, email, password, confirmPassword }: any = req.body;
  try {
    const userExisted = await User.findOne({ email: email });
    if (userExisted) {
      return res.status(400).json({
        msg: `User ${email} already exists`,
        status: 400,
      });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({
        msg: "Passwords does not match",
        status: 400,
      });
    }
    const hashedPassword: any = await bcrypt.hash(password, 10);
    if (hashedPassword) {
      const user = new User({
        username: username,
        email: email,
        password: hashedPassword,
        created_at: new Date(),
      });
      await user.save();
      clearCookie(res);
      generateTokenCookie(user, res);
      return res.status(201).json({
        username: user.username,
        email: user.email,
        msg: "User created successfully",
        status: 201,
      });
    }
  } catch (error: any) {
    errorHandler(error, res);
  }
};

/* User Login */
export const userSignIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({
        msg: `User ${email} not found`,
        status: 404,
      });
    }
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      return res.status(400).json({
        msg: "Invalid credentials",
        status: 400,
      });
    }
    clearCookie(res);
    generateTokenCookie(user, res);
    return res.status(200).json({
      userId: user._id.toString(),
      username: user.username,
      email: user.email,
      msg: `${email} logged in successfully`,
      status: 200,
    });
  } catch (error: any) {
    errorHandler(error, res);
  }
};

export const verifyUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(404).json({
        msg: `User ${res.locals.jwtData.id} not found`,
        status: 404,
      });
    }
    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).json({
        msg: "Permission denied",
        status: 401,
      });
    }
    return res.status(200).json({
      userId: user._id.toString(),
      username: user.username,
      email: user.email,
      msg: "User verified successfully",
      status: 200,
    });
  } catch (error: any) {
    errorHandler(error, res);
  }
};

/* User Logout */
export const userSignOut = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    clearCookie(res);
    return res.status(200).json({
      msg: "User logged out successfully",
    });
  } catch (error: any) {
    errorHandler(error, res);
  }
};
