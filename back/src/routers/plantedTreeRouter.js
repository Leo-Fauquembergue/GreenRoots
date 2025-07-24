import { Router } from "express";
import * as plantedTreeController from "../controllers/plantedTreeController.js";
import { isAuthenticated, isAdmin } from "../middlewares/authMiddleware.js";

export const plantedTreeRouter = Router();

// Route pour un utilisateur qui veut voir SES arbres plantés
plantedTreeRouter.get(
	"/",
	isAuthenticated,
	plantedTreeController.getUserPlantedTrees,
);

// Routes admin pour la gestion globale de tous les arbres plantés
plantedTreeRouter.get(
	"/",
	isAuthenticated,
	isAdmin,
	plantedTreeController.getAllPlantedTrees,
);
plantedTreeRouter.delete(
	"/:id",
	isAuthenticated,
	isAdmin,
	plantedTreeController.deletePlantedTree,
);

// Routes nécessitant une vérification de permission DANS le contrôleur
// (Un utilisateur peut voir/modifier son propre arbre, un admin peut tout voir/modifier)
plantedTreeRouter.get(
	"/:id",
	isAuthenticated,
	plantedTreeController.getOnePlantedTree,
);
plantedTreeRouter.patch(
	"/:id",
	isAuthenticated,
	plantedTreeController.updatePlantedTree,
);
