import { z } from "zod";

// ─── Field-level validators ───────────────────────────────────────────────────

export const nameField = z
  .string({ required_error: "Name is required" })
  .trim()
  .min(2, "Name must be at least 2 characters")
  .max(100, "Name must not exceed 100 characters");

export const emailField = z
  .string({ required_error: "Email is required" })
  .trim()
  .toLowerCase()
  .email("Please provide a valid email address");

export const subjectField = z
  .string()
  .trim()
  .max(200, "Subject must not exceed 200 characters")
  .optional()
  .default("General Inquiry");

export const messageField = z
  .string({ required_error: "Message is required" })
  .trim()
  .min(10, "Message must be at least 10 characters")
  .max(5000, "Message must not exceed 5000 characters");

export const statusField = z.enum(
  ["Pending", "Read", "Replied", "Archived"],
  {
    errorMap: () => ({
      message: "Status must be one of: Pending, Read, Replied, Archived",
    }),
  }
);

// ─── Endpoint Schemas ─────────────────────────────────────────────────────────

/** POST /api/contacts — submitted by public visitors via the contact form */
export const createContactSchema = z.object({
  name:    nameField,
  email:   emailField,
  subject: subjectField,
  message: messageField,
});

/** PUT /api/contacts/:id — admin updating message status only */
export const updateContactStatusSchema = z.object({
  status: statusField,
});
