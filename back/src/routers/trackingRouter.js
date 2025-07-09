import { Router } from "express";
import * as trackingController from "../controllers/trackingController.js";

export const trackingRouter = Router();

trackingRouter.get("/", trackingController.getAllTrackings);
trackingRouter.get("/:id", trackingController.getOneTracking);
trackingRouter.post("/", trackingController.createTracking);
trackingRouter.patch("/:id", trackingController.updateTracking);
trackingRouter.delete("/:id", trackingController.deleteTracking);