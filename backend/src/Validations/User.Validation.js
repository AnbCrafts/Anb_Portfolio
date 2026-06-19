import { z } from "zod";

// ─── Field-level validators ───────────────────────────────────────────────────

export const nameField = z
  .string({ required_error: "Name is required" })
  .trim()
  .min(2, "Name must be at least 2 characters")
  .max(80, "Name must not exceed 80 characters");

export const emailField = z
  .string({ required_error: "Email is required" })
  .trim()
  .toLowerCase()
  .email("Please provide a valid email address");

export const passwordField = z
  .string({ required_error: "Password is required" })
  .min(6, "Password must be at least 6 characters")
  .max(128, "Password must not exceed 128 characters");

export const newPasswordField = z
  .string({ required_error: "New password is required" })
  .min(6, "New password must be at least 6 characters")
  .max(128, "New password must not exceed 128 characters");

export const currentPasswordField = z
  .string({ required_error: "Current password is required" })
  .min(1, "Current password is required");

export const roleField = z
  .enum(["SuperAdmin"], {
    errorMap: () => ({ message: "Role must be SuperAdmin" }),
  })
  .default("SuperAdmin");

// ─── Endpoint Schemas ─────────────────────────────────────────────────────────

/** POST /api/auth/login */
export const loginSchema = z.object({
  email:    emailField,
  password: passwordField,
});

/** POST /api/auth/seed  (initial admin creation) */
export const seedAdminSchema = z.object({
  name:     nameField,
  email:    emailField,
  password: passwordField,
});

/** PUT /api/auth/profile — all fields optional but at least one must be provided */
export const updateProfileSchema = z
  .object({
    name:            nameField.optional(),
    email:           emailField.optional(),
    currentPassword: currentPasswordField.optional(),
    newPassword:     newPasswordField.optional(),
  })
  .refine(
    (data) => {
      // If changing password, both fields are required together
      const hasNew     = !!data.newPassword;
      const hasCurrent = !!data.currentPassword;
      return hasNew === hasCurrent; // both present or both absent
    },
    {
      message: "Both currentPassword and newPassword are required to change your password",
      path: ["currentPassword"],
    }
  )
  .refine(
    (data) => Object.values(data).some(Boolean),
    { message: "At least one field must be provided to update" }
  );
