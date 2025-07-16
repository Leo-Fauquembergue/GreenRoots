import { Router } from "express";
import * as orderController from "../controllers/orderController.js";

export const orderRouter = Router();

orderRouter.get("/", orderController.getAllOrders);

//la route la plus spécifique en premier
orderRouter.get('/my-orders', orderController.getUserOrders); 

//la route dynamique (plus générale) après
orderRouter.get("/:id", orderController.getOneOrder); 

orderRouter.post("/", orderController.createOrder);
orderRouter.patch("/:id", orderController.updateOrder);
orderRouter.delete("/:id", orderController.deleteOrder);