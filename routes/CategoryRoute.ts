import { Router } from "express";
import CategoryController from "../controllers/CategoryController";
import { createValidator } from "../validators/UserValidator";
import { middleware } from "../middleware";

const router = Router();

router.get("/categories", middleware, CategoryController.index);
router.post(
  "/categories",
  middleware,
  createValidator,
  CategoryController.create
);
router.get("/categories/:id", middleware, CategoryController.show);
router.put(
  "/categories/:id",
  middleware,
  createValidator,
  CategoryController.update
);
router.delete("/categories/:id", middleware, CategoryController.delete);

export default router;
