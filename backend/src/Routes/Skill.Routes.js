import express from "express";
import {
  createSkill,
  getAllSkills,
  updateSkill,
  deleteSkill,
} from "../Controllers/Skill.Controller.js";
import { protect } from "../Middleware/Auth.Middleware.js";

const router = express.Router();

router.route("/")
  .get(getAllSkills)
  .post(protect, createSkill);

router.route("/:id")
  .put(protect, updateSkill)
  .delete(protect, deleteSkill);

export default router;
