import { Router } from "express";
import * as plantedTreeController from "../controllers/plantedTreeController.js";

export const plantedTreeRouter = Router();

plantedTreeRouter.get("/", plantedTreeController.getAllPlantedTrees);
plantedTreeRouter.get("/:id", plantedTreeController.getOnePlantedTree);
plantedTreeRouter.post("/", plantedTreeController.createPlantedTree);
plantedTreeRouter.patch("/:id", plantedTreeController.updatePlantedTree);
plantedTreeRouter.delete("/:id", plantedTreeController.deletePlantedTree);