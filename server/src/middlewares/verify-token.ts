import jwt from "jsonwebtoken";
import "dotenv/config";
import { Response, Request, NextFunction } from "express";
import { COOKIE_NAME } from "../utils/constants";

const jwtSecret: any = process.env.JWT_SECRET;
export const generateToken = (id: string, email: string, expiresIn: string) => {
  const payload = { id, email };
  const token = jwt.sign(payload, jwtSecret, {
    expiresIn: "7d",
  });
  return token;
};

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.signedCookies[`${COOKIE_NAME}`];
  if (!token || token.trim() === "") {
    return res.status(401).json({
      msg: "Token not found",
      status: 401,
    });
  }
  return new Promise<void>((resolve, reject) => {
    return jwt.verify(token, jwtSecret, (err: any, decoded: any) => {
      if (err) {
        return res.status(401).json({
          msg: "Unauthorized access or expired token",
          status: 401,
        });
      }
      resolve();
      res.locals.jwtData = decoded;
      return next();
    });
  });
};
