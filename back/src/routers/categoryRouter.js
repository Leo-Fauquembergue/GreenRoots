import { Router } from "express";
import * as categoryController from "../controllers/categoryController.js";

export const categoryRouter = Router();

categoryRouter.get("/", categoryController.getAllCategories);
categoryRouter.get("/:id", categoryController.getOneCategory);
categoryRouter.post("/", categoryController.createCategory);
categoryRouter.patch("/:id", categoryController.updateCategory);
categoryRouter.delete("/:id", categoryController.deleteCategory);
