import express from "express";
import { showCurrentUser } from "../controllers/userController";
import { authenticationMiddleware } from "../middleware/auth";

const router = express.Router();

router.route("/show-me").get(authenticationMiddleware, showCurrentUser);

export default router;
