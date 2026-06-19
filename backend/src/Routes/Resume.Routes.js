import express from "express";
import {
  createResume,
  getAllResumes,
  getActiveResume,
  updateResume,
  deleteResume,
} from "../Controllers/Resume.Controller.js";
import { protect } from "../Middleware/Auth.Middleware.js";

const router = express.Router();

router.route("/")
  .get(protect, getAllResumes)
  .post(protect, createResume);

router.route("/active")
  .get(getActiveResume);

router.route("/:id")
  .put(protect, updateResume)
  .delete(protect, deleteResume);

export default router;
