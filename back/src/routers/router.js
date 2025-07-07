import { Router } from "express";
import { router as homeRouter } from "./home.js";


export const router = Router();

router.use(homeRouter);