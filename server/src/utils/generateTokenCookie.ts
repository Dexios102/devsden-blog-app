import { Response } from "express";
import { COOKIE_NAME } from "../utils/constants";
import { generateToken } from "../middlewares/verify-token";

export const generateTokenCookie = (user: any, res: Response) => {
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
};
