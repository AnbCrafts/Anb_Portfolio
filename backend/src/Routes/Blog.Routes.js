import express from "express";
import {
  createBlog,
  getAllBlogs,
  getBlogBySlug,
  updateBlog,
  deleteBlog,
  addBlogSuggestion,
} from "../Controllers/Blog.Controller.js";
import { protect } from "../Middleware/Auth.Middleware.js";

const router = express.Router();

router.route("/")
  .get(getAllBlogs)
  .post(protect, createBlog);

router.route("/slug/:slug")
  .get(getBlogBySlug);

router.route("/slug/:slug/suggestions")
  .post(addBlogSuggestion);

router.route("/:id")
  .put(protect, updateBlog)
  .delete(protect, deleteBlog);

export default router;
