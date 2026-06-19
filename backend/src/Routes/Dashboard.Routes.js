import express from "express";
import { getDashboardAnalytics } from "../Controllers/Dashboard.Controller.js";
import { protect } from "../Middleware/Auth.Middleware.js";

const router = express.Router();

router.get("/analytics", protect, getDashboardAnalytics);

export default router;
