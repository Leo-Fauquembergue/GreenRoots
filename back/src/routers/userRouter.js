import { Router } from "express";
import * as userController from "../controllers/userController.js";
import { isAuthenticated, isAdmin } from "../middlewares/authMiddleware.js";

export const userRouter = Router();

// Seuls les admins peuvent gérer les utilisateurs
userRouter.get("/", isAuthenticated, isAdmin, userController.getAllUsers);
userRouter.get("/:id", isAuthenticated, isAdmin, userController.getOneUser);
userRouter.patch("/:id", isAuthenticated, isAdmin, userController.updateUser);
userRouter.delete("/:id", isAuthenticated, isAdmin, userController.deleteUser);