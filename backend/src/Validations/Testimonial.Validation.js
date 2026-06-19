import { z } from "zod";

// ─── Field-level validators ───────────────────────────────────────────────────

export const nameField = z
  .string({ required_error: "Testimonial giver's name is required" })
  .trim()
  .min(2, "Name must be at least 2 characters")
  .max(100, "Name must not exceed 100 characters");

export const roleField = z
  .string({ required_error: "Role is required (e.g. Mentor, Manager, Peer)" })
  .trim()
  .min(2, "Role must be at least 2 characters")
  .max(100, "Role must not exceed 100 characters");

export const companyField = z
  .string()
  .trim()
  .max(150, "Company name must not exceed 150 characters")
  .optional()
  .default("");

export const imageField = z
  .string()
  .trim()
  .url("Image must be a valid URL")
  .or(z.literal(""))
  .optional()
  .default("");

export const messageField = z
  .string({ required_error: "Testimonial message is required" })
  .trim()
  .min(10, "Message must be at least 10 characters")
  .max(2000, "Message must not exceed 2000 characters");

export const ratingField = z
  .number({
    invalid_type_error: "Rating must be a number",
  })
  .int("Rating must be a whole number")
  .min(1, "Rating must be at least 1")
  .max(5, "Rating must not exceed 5")
  .optional()
  .default(5);

export const featuredField = z.boolean().optional().default(false);

// ─── Endpoint Schemas ─────────────────────────────────────────────────────────

/** POST /api/testimonials */
export const createTestimonialSchema = z.object({
  name:     nameField,
  role:     roleField,
  message:  messageField,
  company:  companyField,
  image:    imageField,
  rating:   ratingField,
  featured: featuredField,
});

/** PUT /api/testimonials/:id — all fields optional */
export const updateTestimonialSchema = z.object({
  name:     nameField.optional(),
  role:     roleField.optional(),
  message:  messageField.optional(),
  company:  companyField,
  image:    imageField,
  rating:   ratingField,
  featured: featuredField,
});
