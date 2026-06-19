import express from "express";
import {
  createProject,
  getAllProjects,
  getProjectBySlug,
  updateProject,
  deleteProject,
} from "../Controllers/Project.Controller.js";
import { protect } from "../Middleware/Auth.Middleware.js";

const router = express.Router();

router.route("/")
  .get(getAllProjects)
  .post(protect, createProject);

router.route("/slug/:slug")
  .get(getProjectBySlug);

router.route("/:id")
  .put(protect, updateProject)
  .delete(protect, deleteProject);

export default router;
