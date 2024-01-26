import { Router } from "express";
import {
  userSignUp,
  userSignIn,
  verifyUser,
  userSignOut,
} from "../controllers/auth-controller";
import {
  validate,
  signupValidator,
  loginValidator,
} from "../middlewares/input-validator";
import { verifyToken } from "../middlewares/verify-token";

const authRoutes = Router();

authRoutes.post("/signup", validate(signupValidator), userSignUp);
authRoutes.post("/signin", validate(loginValidator), userSignIn);
authRoutes.get("/auth-status", verifyToken, verifyUser);
authRoutes.get("/signout", verifyToken, userSignOut);

export default authRoutes;
