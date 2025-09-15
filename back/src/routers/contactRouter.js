import { Router } from "express";
import * as contactController from "../controllers/contactController.js";

export const contactRouter = Router();

contactRouter.post("/", contactController.submitContactForm);