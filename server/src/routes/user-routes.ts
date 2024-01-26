import { Router } from "express";
import { getAllUsers } from "../controllers/user-controller";
import { verifyToken } from "../middlewares/verify-token";

const userRoutes = Router();

userRoutes.get("/", verifyToken, getAllUsers);

export default userRoutes;
