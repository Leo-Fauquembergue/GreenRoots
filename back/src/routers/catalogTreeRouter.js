import { Router } from "express";
import * as catalogTreeController from "../controllers/catalogTreeController.js";
import * as categoryController from "../controllers/categoryController.js"

export const catalogTreeRouter = Router();
export const categoryRouter = Router();

catalogTreeRouter.get("/", catalogTreeController.getAllCatalogTrees);
catalogTreeRouter.get("/:id", catalogTreeController.getOneCatalogTree);
catalogTreeRouter.post("/", catalogTreeController.createCatalogTree);
catalogTreeRouter.patch("/:id", catalogTreeController.updateCatalogTree);
catalogTreeRouter.delete("/:id", catalogTreeController.deleteCatalogTree);

categoryRouter.get("/", categoryController.getAllCategories);
categoryRouter.get("/:id", categoryController.getOneCategory);
categoryRouter.post("/", categoryController.createCategory);
categoryRouter.patch("/:id", categoryController.updateCategory);
categoryRouter.delete("/:id", categoryController.deleteCategory);
categoryRouter.get("/:id/catalog-trees", categoryController.getTreesByCategory);