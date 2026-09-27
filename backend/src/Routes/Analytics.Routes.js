import express from "express";
import { logVisit, getAnalyticsSummary } from "../Controllers/Analytics.Controller.js";
import { protect } from "../Middleware/Auth.Middleware.js";

const router = express.Router();

router.post("/track", logVisit);
router.get("/summary", protect, getAnalyticsSummary);

export default router;
