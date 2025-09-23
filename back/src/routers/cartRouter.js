import { Router } from "express";
import * as cartController from "../controllers/cartController.js";
import { isAuthenticated } from "../middlewares/authMiddleware.js";

export const cartRouter = Router();

// Un utilisateur doit être connecté pour toutes les actions sur son panier
cartRouter.get("/", isAuthenticated, cartController.getCart);
cartRouter.post("/items", isAuthenticated, cartController.addToCart);
cartRouter.delete("/items/:id", isAuthenticated, cartController.deleteFromCart);
cartRouter.post("/checkout", isAuthenticated, cartController.checkout);
