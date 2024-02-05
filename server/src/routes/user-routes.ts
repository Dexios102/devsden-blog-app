import { Router } from "express";
import {
  getAllUsers,
  getUser,
  deleteUser,
} from "../controllers/user-controller";
import { verifyToken } from "../middlewares/verify-token";

const userRoutes = Router();

userRoutes.get("/all-users", verifyToken, getAllUsers);
userRoutes.get("/user/:id", verifyToken, getUser);
userRoutes.delete("/user/:id", verifyToken, deleteUser);

export default userRoutes;
