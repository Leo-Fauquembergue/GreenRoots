import { Router } from "express";
import * as orderController from "../controllers/orderController.js";
import { isAuthenticated, isAdmin } from "../middlewares/authMiddleware.js";

export const orderRouter = Router();

// Route admin pour voir TOUTES les commandes
orderRouter.get("/", isAuthenticated, isAdmin, orderController.getAllOrders);

// Route utilisateur pour voir SES commandes
orderRouter.get("/my-orders", isAuthenticated, orderController.getUserOrders);

// Route pour voir le détail d'UNE commande (avec vérification de permission dans le contrôleur)
orderRouter.get("/:id", isAuthenticated, orderController.getOneOrder);

// Routes admin pour modifier ou supprimer une commande
orderRouter.patch(
	"/:id",
	isAuthenticated,
	isAdmin,
	orderController.updateOrder,
);
orderRouter.delete(
	"/:id",
	isAuthenticated,
	isAdmin,
	orderController.deleteOrder,
);
