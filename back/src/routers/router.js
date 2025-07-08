import { Router } from "express";
import { catalogTreeRouter, categoryRouter } from "./catalogTreeRouter.js";

export const router = Router();

// On connecte les sous-routeurs à des chemins spécifiques
router.use("/catalog-trees", catalogTreeRouter);
router.use("/categories", categoryRouter);