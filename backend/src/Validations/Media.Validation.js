import { z } from "zod";

// ─── Field-level validators ───────────────────────────────────────────────────
// Note: Media records are created automatically by the upload middleware.
// These validators are used for the upload endpoint metadata + query params.

export const nameField = z
  .string({ required_error: "Media filename is required" })
  .trim()
  .min(1, "Filename cannot be empty")
  .max(255, "Filename must not exceed 255 characters");

export const typeField = z.enum(["image", "video", "pdf", "raw"], {
  errorMap: () => ({
    message: "Media type must be one of: image, video, pdf, raw",
  }),
});

export const urlField = z
  .string({ required_error: "Media URL is required" })
  .trim()
  .url("Media URL must be a valid URL");

export const publicIdField = z
  .string({ required_error: "Cloudinary public ID is required" })
  .trim()
  .min(1, "Public ID cannot be empty");

export const sizeField = z
  .number({
    required_error: "Media size is required",
    invalid_type_error: "Media size must be a number (bytes)",
  })
  .positive("Media size must be a positive number")
  .max(50 * 1024 * 1024, "Media size must not exceed 50 MB");

// ─── Endpoint Schemas ─────────────────────────────────────────────────────────

/**
 * POST /api/media/upload
 * The file itself is handled by multer — this validates the body metadata
 * that gets saved to the Media document after upload.
 */
export const uploadMediaSchema = z.object({
  name:     nameField,
  type:     typeField,
  url:      urlField,
  publicId: publicIdField,
  size:     sizeField,
});

/**
 * GET /api/media — optional query filters
 */
export const mediaQuerySchema = z.object({
  type:  typeField.optional(),
  page:  z.coerce.number().int().positive().optional().default(1),
  limit: z.coerce.number().int().positive().max(100).optional().default(20),
});
