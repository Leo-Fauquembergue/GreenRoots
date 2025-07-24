import { Router } from "express";
import { catalogTreeRouter } from "./catalogTreeRouter.js";
import { categoryRouter } from "./categoryRouter.js";
import { plantedTreeRouter } from "./plantedTreeRouter.js";
import { regionRouter } from "./regionRouter.js";
import { orderRouter } from "./orderRouter.js";
import { authRouter } from "./authRouter.js";
import { userRouter } from "./userRouter.js";
import { trackingRouter } from "./trackingRouter.js";
import { cartRouter } from "./cartRouter.js";
import { contactRouter } from "./contactRouter.js";

export const router = Router();

router.use("/catalog-trees", catalogTreeRouter);
router.use("/categories", categoryRouter);
router.use("/planted-trees", plantedTreeRouter);
router.use("/regions", regionRouter);
router.use("/orders", orderRouter);
router.use("/auth", authRouter);
router.use("/users", userRouter);
router.use("/tracking", trackingRouter);
router.use("/cart", cartRouter);
router.use("/contact", contactRouter);
