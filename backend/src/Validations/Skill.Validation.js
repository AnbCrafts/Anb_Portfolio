import { z } from "zod";

// ─── Field-level validators ───────────────────────────────────────────────────

export const nameField = z
  .string({ required_error: "Skill name is required" })
  .trim()
  .min(1, "Skill name cannot be empty")
  .max(80, "Skill name must not exceed 80 characters");

export const iconField = z
  .string()
  .trim()
  .max(100, "Icon value must not exceed 100 characters")
  .optional()
  .default("");

export const categoryField = z.enum(
  ["Frontend", "Backend", "Database", "DevOps & Tools"],
  {
    errorMap: () => ({
      message: "Category must be one of: Frontend, Backend, Database, DevOps & Tools",
    }),
  }
);

export const proficiencyField = z
  .number({
    required_error: "Proficiency is required",
    invalid_type_error: "Proficiency must be a number",
  })
  .int("Proficiency must be an integer")
  .min(0, "Proficiency must be at least 0")
  .max(100, "Proficiency must not exceed 100")
  .optional()
  .default(80);

export const displayOrderField = z
  .number()
  .int("Display order must be an integer")
  .min(0, "Display order must be 0 or greater")
  .optional()
  .default(0);

// ─── Endpoint Schemas ─────────────────────────────────────────────────────────

/** POST /api/skills */
export const createSkillSchema = z.object({
  name:         nameField,
  category:     categoryField,
  icon:         iconField,
  proficiency:  proficiencyField,
  displayOrder: displayOrderField,
});

/** PUT /api/skills/:id — all fields optional */
export const updateSkillSchema = z.object({
  name:         nameField.optional(),
  category:     categoryField.optional(),
  icon:         iconField,
  proficiency:  proficiencyField,
  displayOrder: displayOrderField,
});
