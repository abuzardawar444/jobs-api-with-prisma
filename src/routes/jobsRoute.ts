import express from "express";
import {
  createJob,
  deleteJob,
  getAllJobs,
  getSingleJob,
  updateJob,
} from "../controllers/jobs.js";
import { authMiddleWare } from "../middleware/auth.js";

const router = express.Router();

router.route("/").get(getAllJobs).post(authMiddleWare, createJob);
router.route("/:id").get(getSingleJob).delete(deleteJob).patch(updateJob);

export default router;
