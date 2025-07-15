import { Router } from "express";
import * as cartController from "../controllers/cartController.js";

export const cartRouter = Router();

cartRouter.get("/", cartController.getCart);
cartRouter.post("/items", cartController.addToCart);
cartRouter.delete("/items/:id", cartController.deleteFromCart);
cartRouter.post("/checkout", cartController.checkout);