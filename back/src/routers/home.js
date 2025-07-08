import { Router } from "express";
import * as homeController from "./../controllers/home.js";
export const router = Router();


router.get("/", homeController.getLatest);