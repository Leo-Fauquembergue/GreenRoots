import { Router } from "express";
import * as catalogTreeController from "../controllers/catalogTreeController.js";
import { isAuthenticated, isAdmin } from "../middlewares/authMiddleware.js";

export const catalogTreeRouter = Router();

// Routes publiques pour consulter le catalogue
catalogTreeRouter.get("/", catalogTreeController.getAllCatalogTrees);
catalogTreeRouter.get("/:id", catalogTreeController.getOneCatalogTree);

// Routes protégées pour les administrateurs qui gèrent le catalogue
catalogTreeRouter.post("/", isAuthenticated, isAdmin, catalogTreeController.createCatalogTree);
catalogTreeRouter.patch("/:id", isAuthenticated, isAdmin, catalogTreeController.updateCatalogTree);
catalogTreeRouter.delete("/:id", isAuthenticated, isAdmin, catalogTreeController.deleteCatalogTree);