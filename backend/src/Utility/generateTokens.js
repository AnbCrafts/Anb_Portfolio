import jwt from "jsonwebtoken";

// ─────────────────────────────────────────────
// Token Generators
// ─────────────────────────────────────────────

/**
 * Generate a short-lived Access Token (15 minutes by default).
 * Sent to the client as an httpOnly cookie on every login / refresh.
 */
export const generateAccessToken = (userId) => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: process.env.JWT_ACCESS_EXPIRES || "15m" }
  );
};

/**
 * Generate a long-lived Refresh Token (30 days by default).
 * Used ONLY to issue new access tokens — never for API access.
 * Stored in a separate, stricter httpOnly cookie.
 */
export const generateRefreshToken = (userId) => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: process.env.JWT_REFRESH_EXPIRES || "30d" }
  );
};

// ─────────────────────────────────────────────
// Cookie Options
// ─────────────────────────────────────────────

const isProduction = process.env.NODE_ENV === "production";

/**
 * Access token cookie — short-lived, httpOnly, not accessible via JS.
 */
export const accessTokenCookieOptions = {
  httpOnly: true,
  secure: isProduction,
  sameSite: isProduction ? "strict" : "lax",
  maxAge: 15 * 60 * 1000, // 15 minutes in ms
};

/**
 * Refresh token cookie — long-lived, httpOnly, path locked to /api/auth/refresh.
 * Scoping the path means the browser only sends this cookie to the refresh endpoint.
 */
export const refreshTokenCookieOptions = {
  httpOnly: true,
  secure: isProduction,
  sameSite: isProduction ? "strict" : "lax",
  maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in ms
  path: "/api/auth/refresh",
};

// ─────────────────────────────────────────────
// Helper: Set Both Tokens as Cookies on Response
// ─────────────────────────────────────────────

/**
 * Attaches both access and refresh tokens to the response as httpOnly cookies.
 * Call this in login and refresh controllers.
 *
 * @param {Response} res - Express response object
 * @param {string} userId - MongoDB user _id
 */
export const attachTokenCookies = (res, userId) => {
  const accessToken  = generateAccessToken(userId);
  const refreshToken = generateRefreshToken(userId);

  res.cookie("accessToken",  accessToken,  accessTokenCookieOptions);
  res.cookie("refreshToken", refreshToken, refreshTokenCookieOptions);

  return { accessToken, refreshToken };
};

// ─────────────────────────────────────────────
// Helper: Clear Both Token Cookies (Logout)
// ─────────────────────────────────────────────

/**
 * Clears both auth cookies from the browser.
 * Call this in the logout controller.
 */
export const clearTokenCookies = (res) => {
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "strict" : "lax",
  });
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "strict" : "lax",
    path: "/api/auth/refresh",
  });
};
