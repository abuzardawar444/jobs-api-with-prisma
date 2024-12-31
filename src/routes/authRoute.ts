import express from "express";
import {
  forgotPassword,
  login,
  logout,
  register,
  resetPassword,
  verifyEmail,
} from "../controllers/user";
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
router.route("/forgot").post(forgotPassword);
router.route("/reset").post(resetPassword);
export default router;
