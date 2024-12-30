import express from "express";
import {
  showCurrentUser,
  updateUserPassword,
} from "../controllers/userController";
import { authenticationMiddleware } from "../middleware/auth";

const router = express.Router();

router.route("/show-me").get(authenticationMiddleware, showCurrentUser);
router.route("/password").patch(authenticationMiddleware, updateUserPassword);
export default router;
