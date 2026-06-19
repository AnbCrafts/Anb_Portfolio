import { z } from "zod";

// ─── Field-level validators ───────────────────────────────────────────────────

export const titleField = z
  .string({ required_error: "Resume title is required" })
  .trim()
  .min(2, "Resume title must be at least 2 characters")
  .max(150, "Resume title must not exceed 150 characters");

export const fileUrlField = z
  .string({ required_error: "Resume file URL is required" })
  .trim()
  .url("Resume file URL must be a valid URL")
  .min(1, "Resume file URL is required");

export const activeField = z.boolean().optional().default(false);

// ─── Endpoint Schemas ─────────────────────────────────────────────────────────

/**
 * POST /api/resumes
 * Typically after the resume PDF is uploaded to Cloudinary and we store the URL.
 */
export const createResumeSchema = z.object({
  title:   titleField,
  fileUrl: fileUrlField,
  active:  activeField,
});

/**
 * PUT /api/resumes/:id
 * Allows updating the label, swapping the file URL, or toggling active status.
 * Setting active: true triggers the pre-save hook to deactivate all other resumes.
 */
export const updateResumeSchema = z.object({
  title:   titleField.optional(),
  fileUrl: fileUrlField.optional(),
  active:  activeField,
});

/**
 * PATCH /api/resumes/:id/activate
 * Convenience endpoint to just flip the active flag without sending the full body.
 */
export const activateResumeSchema = z.object({
  active: z.literal(true, {
    errorMap: () => ({ message: "active must be true to activate a resume" }),
  }),
});
