import express from "express";
import {
  seedSuperAdmin,
  loginInit,
  loginVerify,
  forgotPassword,
  resetPassword,
  refreshAccessToken,
  logout,
  getProfile,
  updateProfile,
} from "../Controllers/Auth.Controller.js";
import { protect } from "../Middleware/Auth.Middleware.js";

const router = express.Router();

// ── Public ────────────────────────────────────
router.post("/seed",    seedSuperAdmin);     // One-time SuperAdmin creation
router.post("/login/init",   loginInit);     // MFA login initiation (verify pass & send OTP)
router.post("/login/verify", loginVerify);   // MFA login verification (check OTP & issue token)
router.post("/forgot-password", forgotPassword); // Send OTP to admin mail for password reset
router.post("/reset-password",  resetPassword);  // Check OTP & save new password
router.post("/refresh", refreshAccessToken); // Issue new access token from refresh cookie

// ── Private ───────────────────────────────────
router.post("/logout",         protect, logout);         // Clear cookies
router.get("/profile",         protect, getProfile);     // Get current user
router.put("/profile",         protect, updateProfile);  // Update name/email/password

export default router;
