import { z } from "zod";

// ─── Field-level validators ───────────────────────────────────────────────────

export const titleField = z
  .string({ required_error: "Job/role title is required" })
  .trim()
  .min(2, "Title must be at least 2 characters")
  .max(150, "Title must not exceed 150 characters");

export const companyField = z
  .string({ required_error: "Company or issuer name is required" })
  .trim()
  .min(1, "Company name cannot be empty")
  .max(150, "Company name must not exceed 150 characters");

export const locationField = z
  .string()
  .trim()
  .max(100, "Location must not exceed 100 characters")
  .optional()
  .default("");

export const yearField = z
  .string({ required_error: "Year display string is required" })
  .trim()
  .min(4, "Year must be at least 4 characters (e.g. '2024' or '2023 - Present')")
  .max(40, "Year string must not exceed 40 characters");

export const descField = z
  .string({ required_error: "Description is required" })
  .trim()
  .min(10, "Description must be at least 10 characters")
  .max(3000, "Description must not exceed 3000 characters");

export const typeField = z
  .enum(["work", "education", "achievement"], {
    errorMap: () => ({
      message: "Type must be one of: work, education, achievement",
    }),
  })
  .optional()
  .default("work");

export const skillsField = z
  .array(z.string().trim().min(1, "Skill item cannot be empty"))
  .optional()
  .default([]);

export const certificateField = z
  .string()
  .trim()
  .url("Certificate must be a valid URL")
  .or(z.literal(""))
  .optional()
  .default("");

export const displayOrderField = z
  .number()
  .int("Display order must be an integer")
  .min(0, "Display order must be 0 or greater")
  .optional()
  .default(0);

// ─── Endpoint Schemas ─────────────────────────────────────────────────────────

/** POST /api/experience */
export const createExperienceSchema = z.object({
  title:        titleField,
  company:      companyField,
  year:         yearField,
  desc:         descField,
  location:     locationField,
  type:         typeField,
  skills:       skillsField,
  certificate:  certificateField,
  displayOrder: displayOrderField,
});

/** PUT /api/experience/:id — all fields optional */
export const updateExperienceSchema = z.object({
  title:        titleField.optional(),
  company:      companyField.optional(),
  year:         yearField.optional(),
  desc:         descField.optional(),
  location:     locationField,
  type:         typeField,
  skills:       skillsField,
  certificate:  certificateField,
  displayOrder: displayOrderField,
});
