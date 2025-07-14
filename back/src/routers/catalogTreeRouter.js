import { Router } from "express";
import * as catalogTreeController from "../controllers/catalogTreeController.js";

export const catalogTreeRouter = Router();

catalogTreeRouter.get("/", catalogTreeController.getAllCatalogTrees);
catalogTreeRouter.get("/:id", catalogTreeController.getOneCatalogTree);
catalogTreeRouter.post("/", catalogTreeController.createCatalogTree);
catalogTreeRouter.patch("/:id", catalogTreeController.updateCatalogTree);
catalogTreeRouter.delete("/:id", catalogTreeController.deleteCatalogTree);
