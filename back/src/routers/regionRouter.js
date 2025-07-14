import { Router } from "express";
import * as regionController from "../controllers/regionController.js";

export const regionRouter = Router();

regionRouter.get("/", regionController.getAllRegions);
regionRouter.get("/:id", regionController.getOneRegion);
regionRouter.post("/", regionController.createRegion);
regionRouter.patch("/:id", regionController.updateRegion);
regionRouter.delete("/:id", regionController.deleteRegion);
