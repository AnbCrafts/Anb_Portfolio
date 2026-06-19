import express from "express";
import {
  createTestimonial,
  getAllTestimonials,
  updateTestimonial,
  deleteTestimonial,
} from "../Controllers/Testimonial.Controller.js";
import { protect } from "../Middleware/Auth.Middleware.js";

const router = express.Router();

router.route("/")
  .get(getAllTestimonials)
  .post(protect, createTestimonial);

router.route("/:id")
  .put(protect, updateTestimonial)
  .delete(protect, deleteTestimonial);

export default router;
