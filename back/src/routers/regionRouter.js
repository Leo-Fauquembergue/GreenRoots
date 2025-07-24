import { Router } from "express";
import * as regionController from "../controllers/regionController.js";
import { isAuthenticated, isAdmin } from "../middlewares/authMiddleware.js";

export const regionRouter = Router();

// Tout le monde peut voir la liste des régions pour filtrer
regionRouter.get("/", regionController.getAllRegions);
regionRouter.get("/:id", regionController.getOneRegion);

// Seuls les admins peuvent gérer les régions
regionRouter.post("/", isAuthenticated, isAdmin, regionController.createRegion);
regionRouter.patch(
	"/:id",
	isAuthenticated,
	isAdmin,
	regionController.updateRegion,
);
regionRouter.delete(
	"/:id",
	isAuthenticated,
	isAdmin,
	regionController.deleteRegion,
);
