import jwt from "jsonwebtoken";
import User from "../Schema/User.Schema.js";
import asyncHandler from "../Utility/asyncHandler.js";
import ApiError from "../Utility/ApiError.js";
import ApiResponse from "../Utility/ApiResponse.js";
import { sendEmail } from "../Services/email.service.js";
import {
  attachTokenCookies,
  clearTokenCookies,
  generateAccessToken,
  accessTokenCookieOptions,
} from "../Utility/generateTokens.js";

// ─────────────────────────────────────────────
// @desc    Seed first SuperAdmin from environment variables
// @route   POST /api/auth/seed
// @access  Public (one-time use — disable in production)
// ─────────────────────────────────────────────
const seedSuperAdmin = asyncHandler(async (req, res) => {
  const adminExists = await User.findOne({ role: "SuperAdmin" });

  if (adminExists) {
    throw new ApiError(400, "SuperAdmin already exists in database");
  }

  const email    = process.env.SUPERADMIN_EMAIL    || "anubhawgupta664@gmail.com";
  const password = process.env.SUPERADMIN_PASSWORD || "anb@19022205";
  const name     = process.env.SUPERADMIN_NAME     || "Anubhaw Gupta";

  const admin = await User.create({ name, email, password, role: "SuperAdmin" });

  return res.status(201).json(
    new ApiResponse(201, {
      id:    admin._id,
      name:  admin.name,
      email: admin.email,
      role:  admin.role,
    }, "SuperAdmin seeded successfully")
  );
});

// ─────────────────────────────────────────────
// @desc    Admin login Step 1: Init (Verify password & send email OTP)
// @route   POST /api/auth/login/init
// @access  Public
// ─────────────────────────────────────────────
const loginInit = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "Please provide email and password");
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new ApiError(401, "Invalid email or password");
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new ApiError(401, "Invalid email or password");
  }

  // Generate 6-digit OTP
  const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
  user.otp = otpCode;
  user.otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes expiry
  await user.save();

  // Send email
  await sendEmail({
    to: user.email,
    subject: "Admin Control Center OTP - Login Verification",
    text: `Your OTP for logging into the admin panel is: ${otpCode}. This code is valid for 10 minutes.`,
    html: `<h3>Admin Control Center Authentication</h3>
           <p>Your one-time login verification OTP is: <strong>${otpCode}</strong></p>
           <p>This code will expire in 10 minutes.</p>`,
  });

  return res.status(200).json(
    new ApiResponse(200, { mfaRequired: true }, "MFA OTP sent successfully")
  );
});

// ─────────────────────────────────────────────
// @desc    Admin login Step 2: Verify OTP
// @route   POST /api/auth/login/verify
// @access  Public
// ─────────────────────────────────────────────
const loginVerify = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    throw new ApiError(400, "Please provide email and OTP");
  }

  const user = await User.findOne({ email });
  if (!user || !user.otp || !user.otpExpires) {
    throw new ApiError(400, "No pending OTP request found for this email");
  }

  // Check expiry
  if (new Date() > user.otpExpires) {
    user.otp = null;
    user.otpExpires = null;
    await user.save();
    throw new ApiError(400, "OTP has expired. Please try logging in again.");
  }

  // Check match
  if (user.otp !== otp) {
    throw new ApiError(400, "Invalid OTP code. Please check and try again.");
  }

  // OTP is valid! Clear it
  user.otp = null;
  user.otpExpires = null;
  await user.save();

  // Attach cookies and tokens
  const { accessToken } = attachTokenCookies(res, user._id);

  return res.status(200).json(
    new ApiResponse(200, {
      user: {
        id:    user._id,
        name:  user.name,
        email: user.email,
        role:  user.role,
      },
      accessToken,
    }, "Authentication verified, login successful")
  );
});

// ─────────────────────────────────────────────
// @desc    Forgot Password (Send OTP)
// @route   POST /api/auth/forgot-password
// @access  Public
// ─────────────────────────────────────────────
const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    throw new ApiError(400, "Please provide your email address");
  }

  const user = await User.findOne({ email, role: "SuperAdmin" });
  if (!user) {
    // Return success message even if email is wrong to prevent user enumeration
    return res.status(200).json(
      new ApiResponse(200, {}, "If this email is registered, an OTP has been sent.")
    );
  }

  const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
  user.otp = otpCode;
  user.otpExpires = new Date(Date.now() + 10 * 60 * 1000);
  await user.save();

  await sendEmail({
    to: user.email,
    subject: "Admin Control Center OTP - Password Reset",
    text: `Your OTP for resetting your admin password is: ${otpCode}. This code is valid for 10 minutes.`,
    html: `<h3>Admin Password Reset Request</h3>
           <p>Your one-time password reset OTP is: <strong>${otpCode}</strong></p>
           <p>This code will expire in 10 minutes.</p>`,
  });

  return res.status(200).json(
    new ApiResponse(200, {}, "Password reset OTP sent successfully")
  );
});

// ─────────────────────────────────────────────
// @desc    Reset Password (Confirm OTP & Update Password)
// @route   POST /api/auth/reset-password
// @access  Public
// ─────────────────────────────────────────────
const resetPassword = asyncHandler(async (req, res) => {
  const { email, otp, newPassword } = req.body;

  if (!email || !otp || !newPassword) {
    throw new ApiError(400, "Please provide email, OTP, and new password");
  }

  if (newPassword.length < 6) {
    throw new ApiError(400, "Password must be at least 6 characters");
  }

  const user = await User.findOne({ email });
  if (!user || !user.otp || !user.otpExpires) {
    throw new ApiError(400, "No pending password reset request found");
  }

  if (new Date() > user.otpExpires) {
    user.otp = null;
    user.otpExpires = null;
    await user.save();
    throw new ApiError(400, "OTP has expired. Please request another one.");
  }

  if (user.otp !== otp) {
    throw new ApiError(400, "Invalid OTP code");
  }

  // Update password and clear OTP
  user.password = newPassword; // schema pre-save hook will hash it!
  user.otp = null;
  user.otpExpires = null;
  await user.save();

  return res.status(200).json(
    new ApiResponse(200, {}, "Password reset successfully. You can now login.")
  );
});

// ─────────────────────────────────────────────
// @desc    Refresh access token using httpOnly refresh token cookie
// @route   POST /api/auth/refresh
// @access  Public (requires valid refresh cookie)
// ─────────────────────────────────────────────
const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken = req.cookies?.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(401, "Refresh token not found. Please login again.");
  }

  // Verify the refresh token
  let decoded;
  try {
    decoded = jwt.verify(incomingRefreshToken, process.env.JWT_REFRESH_SECRET);
  } catch (err) {
    throw new ApiError(401, "Invalid or expired refresh token. Please login again.");
  }

  // Confirm user still exists
  const user = await User.findById(decoded.id);
  if (!user) {
    throw new ApiError(401, "User no longer exists.");
  }

  // Issue a new access token only
  const newAccessToken = generateAccessToken(user._id);
  res.cookie("accessToken", newAccessToken, accessTokenCookieOptions);

  return res.status(200).json(
    new ApiResponse(200, { accessToken: newAccessToken }, "Access token refreshed")
  );
});

// ─────────────────────────────────────────────
// @desc    Logout — clears both auth cookies
// @route   POST /api/auth/logout
// @access  Private
// ─────────────────────────────────────────────
const logout = asyncHandler(async (req, res) => {
  clearTokenCookies(res);

  return res.status(200).json(
    new ApiResponse(200, {}, "Logged out successfully")
  );
});

// ─────────────────────────────────────────────
// @desc    Get current logged in user profile
// @route   GET /api/auth/profile
// @access  Private
// ─────────────────────────────────────────────
const getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return res.status(200).json(
    new ApiResponse(200, { user }, "Profile fetched successfully")
  );
});

// ─────────────────────────────────────────────
// @desc    Update admin profile (name, email, password)
// @route   PUT /api/auth/profile
// @access  Private
// ─────────────────────────────────────────────
const updateProfile = asyncHandler(async (req, res) => {
  const { name, email, currentPassword, newPassword } = req.body;

  const user = await User.findById(req.user.id).select("+password");
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  if (name)  user.name  = name;
  if (email) user.email = email;

  // Only update password if both current and new are provided
  if (currentPassword && newPassword) {
    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      throw new ApiError(400, "Current password is incorrect");
    }
    user.password = newPassword; // Pre-save hook handles hashing
  }

  await user.save();

  return res.status(200).json(
    new ApiResponse(200, {
      id:    user._id,
      name:  user.name,
      email: user.email,
      role:  user.role,
    }, "Profile updated successfully")
  );
});

export {
  seedSuperAdmin,
  loginInit,
  loginVerify,
  forgotPassword,
  resetPassword,
  refreshAccessToken,
  logout,
  getProfile,
  updateProfile,
};
