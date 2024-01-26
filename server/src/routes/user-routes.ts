import { Router } from "express";
import { getAllUsers } from "../controllers/user-controller";

const userRoutes = Router();

userRoutes.get("/", getAllUsers);

export default userRoutes;
