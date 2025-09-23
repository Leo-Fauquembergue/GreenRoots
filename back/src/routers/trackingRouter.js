import { Router } from "express";
import * as trackingController from "../controllers/trackingController.js";
import { isAuthenticated, isAdmin } from "../middlewares/authMiddleware.js";

export const trackingRouter = Router();

// La consultation du suivi devrait être réservée aux utilisateurs connectés.
// Le contrôle de permission (est-ce que c'est bien ton arbre ?) se fera dans le contrôleur si nécessaire.
trackingRouter.get("/", isAuthenticated, trackingController.getAllTrackings);
trackingRouter.get("/:id", isAuthenticated, trackingController.getOneTracking);

// Seuls les admins peuvent ajouter/modifier/supprimer des entrées de suivi
trackingRouter.post(
	"/",
	isAuthenticated,
	isAdmin,
	trackingController.createTracking,
);
trackingRouter.patch(
	"/:id",
	isAuthenticated,
	isAdmin,
	trackingController.updateTracking,
);
trackingRouter.delete(
	"/:id",
	isAuthenticated,
	isAdmin,
	trackingController.deleteTracking,
);
