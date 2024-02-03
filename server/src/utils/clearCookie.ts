import { Response } from "express";
import { COOKIE_NAME } from "../utils/constants";

export const clearCookie = (res: Response) => {
  res.clearCookie(COOKIE_NAME, {
    httpOnly: true,
    path: "/",
    domain: "localhost",
    signed: true,
  });
};
