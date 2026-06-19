import { z } from "zod";

// ─── Field-level validators ───────────────────────────────────────────────────

export const titleField = z
  .string({ required_error: "Project title is required" })
  .trim()
  .min(2, "Title must be at least 2 characters")
  .max(150, "Title must not exceed 150 characters");

export const descriptionField = z
  .string({ required_error: "Project description is required" })
  .trim()
  .min(10, "Description must be at least 10 characters")
  .max(5000, "Description must not exceed 5000 characters");

export const categoryField = z.enum(["frontend", "fullstack", "ai"], {
  errorMap: () => ({ message: "Category must be one of: frontend, fullstack, ai" }),
});

export const techStackField = z
  .array(z.string().trim().min(1, "Tech stack item cannot be empty"))
  .optional()
  .default([]);

export const urlField = (label) =>
  z
    .string()
    .trim()
    .url(`${label} must be a valid URL`)
    .or(z.literal(""))
    .optional()
    .default("");

export const thumbnailField = z
  .string({ required_error: "Thumbnail image URL is required" })
  .trim()
  .url("Thumbnail must be a valid URL")
  .min(1, "Thumbnail image URL is required");

export const galleryField = z
  .array(z.string().trim().url("Each gallery item must be a valid URL"))
  .optional()
  .default([]);

export const featuredField = z.boolean().optional().default(false);

export const displayOrderField = z
  .number()
  .int("Display order must be an integer")
  .min(0, "Display order must be 0 or greater")
  .optional()
  .default(0);

export const statusField = z
  .enum(["active", "draft"], {
    errorMap: () => ({ message: "Status must be either active or draft" }),
  })
  .optional()
  .default("active");

// ─── Endpoint Schemas ─────────────────────────────────────────────────────────

/** POST /api/projects */
export const createProjectSchema = z.object({
  title:        titleField,
  description:  descriptionField,
  category:     categoryField,
  thumbnail:    thumbnailField,
  techStack:    techStackField,
  githubUrl:    urlField("GitHub URL"),
  liveUrl:      urlField("Live URL"),
  demoVideo:    urlField("Demo video URL"),
  gallery:      galleryField,
  featured:     featuredField,
  displayOrder: displayOrderField,
  status:       statusField,
});

/** PUT /api/projects/:id — all fields optional */
export const updateProjectSchema = z.object({
  title:        titleField.optional(),
  description:  descriptionField.optional(),
  category:     categoryField.optional(),
  thumbnail:    thumbnailField.optional(),
  techStack:    techStackField,
  githubUrl:    urlField("GitHub URL"),
  liveUrl:      urlField("Live URL"),
  demoVideo:    urlField("Demo video URL"),
  gallery:      galleryField,
  featured:     featuredField,
  displayOrder: displayOrderField,
  status:       statusField,
});
