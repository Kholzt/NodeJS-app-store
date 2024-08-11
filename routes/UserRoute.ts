import { Router } from "express";
import UserController from "../controllers/UserController";
import { createValidator } from "./../validators/UserValidator";
const router = Router();

router.get("/users", UserController.index);
router.post("/users", createValidator, UserController.create);
router.get("/users/:id", UserController.show);
router.put("/users/:id", createValidator, UserController.update);
router.delete("/users/:id", UserController.delete);

export default router;
