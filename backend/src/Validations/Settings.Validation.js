import { z } from "zod";

// ─── Field-level validators ───────────────────────────────────────────────────
// All Settings fields are optional (single document — partial updates are the norm)

export const githubField = z
  .string()
  .trim()
  .url("GitHub must be a valid URL (e.g. https://github.com/yourname)")
  .or(z.literal(""))
  .optional()
  .default("");

export const linkedinField = z
  .string()
  .trim()
  .url("LinkedIn must be a valid URL (e.g. https://linkedin.com/in/yourname)")
  .or(z.literal(""))
  .optional()
  .default("");

export const emailField = z
  .string()
  .trim()
  .toLowerCase()
  .email("Settings email must be a valid email address")
  .or(z.literal(""))
  .optional()
  .default("");

export const twitterField = z
  .string()
  .trim()
  .url("Twitter must be a valid URL (e.g. https://twitter.com/yourname)")
  .or(z.literal(""))
  .optional()
  .default("");

export const phoneField = z
  .string()
  .trim()
  .regex(
    /^[+]?[\d\s\-().]{7,20}$/,
    "Phone must be a valid phone number (7–20 digits)"
  )
  .or(z.literal(""))
  .optional()
  .default("");

export const locationField = z
  .string()
  .trim()
  .max(150, "Location must not exceed 150 characters")
  .optional()
  .default("");

// ─── Endpoint Schemas ─────────────────────────────────────────────────────────

/** PUT /api/settings — partial update, all fields optional */
export const updateSettingsSchema = z.object({
  github:   githubField,
  linkedin: linkedinField,
  email:    emailField,
  twitter:  twitterField,
  phone:    phoneField,
  location: locationField,
});
