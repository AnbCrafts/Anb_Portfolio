import express from "express";
import { getSettings, updateSettings } from "../Controllers/Settings.Controller.js";
import { protect } from "../Middleware/Auth.Middleware.js";

const router = express.Router();

router.route("/")
  .get(getSettings)
  .put(protect, updateSettings);

export default router;
