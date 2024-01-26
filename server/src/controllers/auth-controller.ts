import User from "../models/user-model";
import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import { generateToken } from "../middlewares/verify-token";
import { COOKIE_NAME } from "../utils/constants";

import { errorHandler } from "../middlewares/error-handler";

export const userSignUp = async (
  req: Request,
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
        msg: "Passwords do not match",
        status: 400,
      });
    }
    const saltRounds: number = 10;
    const hashedPassword: any = await bcrypt.hash(password, saltRounds);
    if (hashedPassword) {
      const user = new User({
        username: username,
        email: email,
        password: hashedPassword,
        created_at: new Date(),
      });
      await user.save();
      res.clearCookie(COOKIE_NAME, {
        httpOnly: true,
        path: "/",
        domain: "localhost",
        signed: true,
      });
      /* Generate JWT */
      const token = generateToken(user._id.toString(), user.email, "1d");
      const expires = new Date();
      expires.setDate(expires.getDate() + 1);
      res.cookie(COOKIE_NAME, token, {
        httpOnly: true,
        path: "/",
        domain: "localhost",
        expires,
        signed: true,
      });
      return res.status(201).json({
        username: user.username,
        email: user.email,
        msg: "User created successfully",
        status: 201,
      });
    }
  } catch (error: any) {
    errorHandler(error, req, res, next);
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
    res.clearCookie(COOKIE_NAME, {
      httpOnly: true,
      path: "/",
      domain: "localhost",
      signed: true,
    });
    /* Generate JWT */
    const token = generateToken(user._id.toString(), user.email, "1d");
    const expires = new Date();
    expires.setDate(expires.getDate() + 1);
    res.cookie(COOKIE_NAME, token, {
      httpOnly: true,
      path: "/",
      domain: "localhost",
      expires,
      signed: true,
    });

    return res.status(200).json({
      userId: user._id.toString(),
      username: user.username,
      email: user.email,
      msg: "User logged in successfully",
      status: 200,
    });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({
      msg: "Internal Server Error",
      error: error.message,
      status: 500,
    });
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
    console.error(error);
    return res.status(500).json({
      msg: "Internal Server Error",
      error: error.message,
      status: 500,
    });
  }
};

/* User Logout */
export const userSignOut = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.clearCookie(COOKIE_NAME, {
      httpOnly: true,
      path: "/",
      domain: "localhost",
      signed: true,
    });
    return res.status(200).json({
      msg: "User logged out successfully",
      status: 200,
    });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({
      msg: "Internal Server Error",
      error: error.message,
      status: 500,
    });
  }
};
