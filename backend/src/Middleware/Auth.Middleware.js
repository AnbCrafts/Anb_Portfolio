import jwt from "jsonwebtoken";
import User from "../Schema/User.Schema.js";
import ApiError from "../Utility/ApiError.js";
import asyncHandler from "../Utility/asyncHandler.js";

// ─────────────────────────────────────────────
// protect
// Checks for a valid JWT in this order:
//   1. httpOnly cookie  →  req.cookies.accessToken  (preferred)
//   2. Authorization header  →  Bearer <token>       (fallback for API clients)
// ─────────────────────────────────────────────
const protect = asyncHandler(async (req, res, next) => {
  let token;

  // 1. Try reading from httpOnly cookie (browser clients)
  if (req.cookies?.accessToken) {
    token = req.cookies.accessToken;
  }

  // 2. Fallback: Authorization: Bearer <token> (Postman / mobile / external clients)
  else if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    throw new ApiError(401, "Not authorized. No token provided.");
  }

  // Verify the access token
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      throw new ApiError(401, "Access token expired. Please refresh your session.");
    }
    throw new ApiError(401, "Invalid token. Authentication failed.");
  }

  // Attach user to request (excludes password)
  const user = await User.findById(decoded.id).select("-password");
  if (!user) {
    throw new ApiError(401, "User no longer exists.");
  }

  req.user = user;
  next();
});

// ─────────────────────────────────────────────
// authorizeRoles
// Role-based access guard — use after protect.
//
// Usage:
//   router.delete('/admin-only', protect, authorizeRoles('SuperAdmin'), handler)
// ─────────────────────────────────────────────
const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user?.role)) {
      throw new ApiError(403, `Access denied. Required role: ${roles.join(" or ")}`);
    }
    next();
  };
};

export { protect, authorizeRoles };
