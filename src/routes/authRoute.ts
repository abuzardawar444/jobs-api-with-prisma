import express from "express";
import { login, logout, register, verifyEmail } from "../controllers/user";
import {
  loginSchema,
  userSchema,
  validateWithZodSchema,
} from "../utils/validation";
import { authenticationMiddleware } from "../middleware/auth";
const router = express.Router();

router.route("/register").post(validateWithZodSchema(userSchema), register);
router.route("/login").post(validateWithZodSchema(loginSchema), login);
router.route("/verify-email").post(verifyEmail);
router.route("/logout").delete(authenticationMiddleware, logout);
export default router;
