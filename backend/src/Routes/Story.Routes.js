import express from "express";
import {
  createStory,
  getAllStories,
  getStoryBySlug,
  updateStory,
  deleteStory,
} from "../Controllers/Story.Controller.js";
import { protect } from "../Middleware/Auth.Middleware.js";

const router = express.Router();

router.route("/")
  .get(getAllStories)
  .post(protect, createStory);

router.route("/slug/:slug")
  .get(getStoryBySlug);

router.route("/:id")
  .put(protect, updateStory)
  .delete(protect, deleteStory);

export default router;
