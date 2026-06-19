import { z } from "zod";

// ─── Field-level validators ───────────────────────────────────────────────────

export const titleField = z
  .string({ required_error: "Story title is required" })
  .trim()
  .min(2, "Title must be at least 2 characters")
  .max(150, "Title must not exceed 150 characters");

export const imageField = z
  .string({ required_error: "Story cover image URL is required" })
  .trim()
  .url("Story cover image must be a valid URL")
  .min(1, "Story cover image URL is required");

export const tagField = z
  .string({ required_error: "Story tag is required" })
  .trim()
  .min(1, "Tag cannot be empty")
  .max(60, "Tag must not exceed 60 characters");

export const descriptionField = z
  .string({ required_error: "Story description is required" })
  .trim()
  .min(10, "Description must be at least 10 characters")
  .max(10000, "Description must not exceed 10000 characters");

export const yearField = z
  .string({ required_error: "Year is required" })
  .trim()
  .min(4, "Year must be at least 4 characters (e.g. 2024)")
  .max(20, "Year string must not exceed 20 characters");

export const locationField = z
  .string({ required_error: "Location is required" })
  .trim()
  .min(2, "Location must be at least 2 characters")
  .max(100, "Location must not exceed 100 characters");

export const builtField = z
  .array(z.string().trim().min(1, "Built item cannot be empty"))
  .optional()
  .default([]);

export const learnedField = z
  .array(z.string().trim().min(1, "Learned item cannot be empty"))
  .optional()
  .default([]);

export const timelineField = z
  .array(z.string().trim().min(1, "Timeline entry cannot be empty"))
  .optional()
  .default([]);

export const certificateField = z
  .string()
  .trim()
  .url("Certificate must be a valid URL")
  .or(z.literal(""))
  .optional()
  .default("");

export const galleryField = z
  .array(z.string().trim().url("Each gallery item must be a valid URL"))
  .optional()
  .default([]);

export const publishedField = z.boolean().optional().default(true);

// ─── Endpoint Schemas ─────────────────────────────────────────────────────────

/** POST /api/stories */
export const createStorySchema = z.object({
  title:       titleField,
  image:       imageField,
  tag:         tagField,
  description: descriptionField,
  year:        yearField,
  location:    locationField,
  built:       builtField,
  learned:     learnedField,
  timeline:    timelineField,
  certificate: certificateField,
  gallery:     galleryField,
  published:   publishedField,
});

/** PUT /api/stories/:id — all fields optional */
export const updateStorySchema = z.object({
  title:       titleField.optional(),
  image:       imageField.optional(),
  tag:         tagField.optional(),
  description: descriptionField.optional(),
  year:        yearField.optional(),
  location:    locationField.optional(),
  built:       builtField,
  learned:     learnedField,
  timeline:    timelineField,
  certificate: certificateField,
  gallery:     galleryField,
  published:   publishedField,
});
