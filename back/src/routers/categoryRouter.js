import { Router } from "express";
import * as categoryController from "../controllers/categoryController.js";
import { isAuthenticated, isAdmin } from "../middlewares/authMiddleware.js";

export const categoryRouter = Router();

// Tout le monde peut voir la liste des catégories pour filtrer
categoryRouter.get("/", categoryController.getAllCategories);
categoryRouter.get("/:id", categoryController.getOneCategory);

// Seuls les admins peuvent gérer les catégories
categoryRouter.post("/", isAuthenticated, isAdmin, categoryController.createCategory);
categoryRouter.patch("/:id", isAuthenticated, isAdmin, categoryController.updateCategory);
categoryRouter.delete("/:id", isAuthenticated, isAdmin, categoryController.deleteCategory);
