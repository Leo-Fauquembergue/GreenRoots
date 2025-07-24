import { Router } from "express";
import * as authController from "../controllers/authController.js";

export const authRouter = Router();

// Routes publiques pour l'authentification
authRouter.post("/register", authController.register);
authRouter.post("/login", authController.login);
authRouter.post("/logout", authController.logout);
authRouter.get("/me", authController.getCurrentUser);
