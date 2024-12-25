import express from "express";
import { login, register } from "../controllers/user";
import {
  loginSchema,
  userSchema,
  validateWithZodSchema,
} from "../utils/validation";
const router = express.Router();

router.route("/register").post(validateWithZodSchema(userSchema), register);
router.route("/login").post(validateWithZodSchema(loginSchema), login);

export default router;
