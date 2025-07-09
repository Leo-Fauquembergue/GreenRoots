import { Router } from "express";
import { catalogTreeRouter} from "./catalogTreeRouter.js";
import { categoryRouter } from "./categoryRouter.js";
import { regionRouter } from "./regionRouter.js";

export const router = Router();

// On connecte les sous-routeurs à des chemins spécifiques
router.use("/catalog-trees", catalogTreeRouter);
router.use("/categories", categoryRouter);
router.use("/regions", regionRouter);