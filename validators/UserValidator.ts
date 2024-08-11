import { body } from "express-validator";

export const createValidator = [
  body("email", "Email does't empty").not().isEmpty(),
  body("email", "Invalid email").isEmail(),
  body("name", "Name does't empty").not().isEmpty(),
];
