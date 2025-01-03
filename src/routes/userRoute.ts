import express from "express";
import {
  showCurrentUser,
  updateUserPassword,
} from "../controllers/userController";
import { authenticationMiddleware } from "../middleware/auth";

const router = express.Router();

router.route("/current-user").get(authenticationMiddleware, showCurrentUser);
router.route("/password").patch(authenticationMiddleware, updateUserPassword);
export default router;
