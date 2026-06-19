import { z } from "zod";

// ─── Field-level validators ───────────────────────────────────────────────────

export const titleField = z
  .string({ required_error: "Certificate title is required" })
  .trim()
  .min(2, "Title must be at least 2 characters")
  .max(200, "Title must not exceed 200 characters");

export const issuerField = z
  .string({ required_error: "Issuer is required" })
  .trim()
  .min(1, "Issuer name cannot be empty")
  .max(150, "Issuer name must not exceed 150 characters");

export const issueDateField = z
  .string({ required_error: "Issue date is required" })
  .refine((val) => !isNaN(Date.parse(val)), {
    message: "Issue date must be a valid date string (e.g. 2024-06-01)",
  });

export const certificateUrlField = z
  .string({ required_error: "Certificate URL is required" })
  .trim()
  .url("Certificate URL must be a valid URL")
  .min(1, "Certificate URL is required");

export const thumbnailField = z
  .string()
  .trim()
  .url("Thumbnail must be a valid URL")
  .or(z.literal(""))
  .optional()
  .default("");

// ─── Endpoint Schemas ─────────────────────────────────────────────────────────

/** POST /api/certificates */
export const createCertificateSchema = z.object({
  title:          titleField,
  issuer:         issuerField,
  issueDate:      issueDateField,
  certificateUrl: certificateUrlField,
  thumbnail:      thumbnailField,
});

/** PUT /api/certificates/:id — all fields optional */
export const updateCertificateSchema = z.object({
  title:          titleField.optional(),
  issuer:         issuerField.optional(),
  issueDate:      issueDateField.optional(),
  certificateUrl: certificateUrlField.optional(),
  thumbnail:      thumbnailField,
});
