import { Router } from "express";
import { catalogTreeRouter} from "./catalogTreeRouter.js";
import { categoryRouter } from "./categoryRouter.js";
import { plantedTreeRouter } from "./plantedTreeRouter.js";
import { regionRouter } from "./regionRouter.js";
import { orderRouter } from "./orderRouter.js";

export const router = Router();

router.use("/catalog-trees", catalogTreeRouter);
router.use("/categories", categoryRouter);
router.use("/planted-trees", plantedTreeRouter);
router.use("/regions", regionRouter);
router.use("/orders", orderRouter);