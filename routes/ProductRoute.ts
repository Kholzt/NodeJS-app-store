import { Router } from "express";
import ProductController from "../controllers/ProductController";
import { createValidator } from "../validators/UserValidator";
import { middleware } from "../middleware";

const router = Router();

router.get("/products", middleware, ProductController.index);
router.post("/products", middleware, createValidator, ProductController.create);
router.get("/products/:id", middleware, ProductController.show);
router.put(
  "/products/:id",
  middleware,
  createValidator,
  ProductController.update
);
router.delete("/products/:id", middleware, ProductController.delete);

export default router;
