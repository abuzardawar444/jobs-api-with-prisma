import express from "express";
import {
  createJob,
  deleteJob,
  getAllJobs,
  getSingleJob,
  updateJob,
} from "../controllers/jobs";
import { authenticationMiddleware } from "../middleware/auth";

const router = express.Router();

router.route("/").get(getAllJobs).post(authenticationMiddleware, createJob);
router.route("/:id").get(getSingleJob).delete(deleteJob).patch(updateJob);

export default router;
