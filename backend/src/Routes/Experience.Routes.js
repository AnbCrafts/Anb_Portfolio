import express from "express";
import {
  createExperience,
  getAllExperiences,
  updateExperience,
  deleteExperience,
} from "../Controllers/Experience.Controller.js";
import { protect } from "../Middleware/Auth.Middleware.js";

const router = express.Router();

router.route("/")
  .get(getAllExperiences)
  .post(protect, createExperience);

router.route("/:id")
  .put(protect, updateExperience)
  .delete(protect, deleteExperience);

export default router;
