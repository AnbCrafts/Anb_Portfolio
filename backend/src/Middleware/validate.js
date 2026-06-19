import ApiError from "../Utility/ApiError.js";

/**
 * validate(schema, source?)
 * ─────────────────────────
 * Generic Zod validation middleware factory.
 * Parses the request source against the provided Zod schema.
 * On failure, throws an ApiError(400) with all field-level error messages.
 *
 * @param {ZodSchema} schema  - Any Zod schema (z.object, z.string, etc.)
 * @param {"body"|"query"|"params"} source - Which part of req to validate (default: "body")
 *
 * Usage in a route file:
 *   import { validate } from "../Middleware/validate.js"
 *   import { createProjectSchema } from "../Validations/Project.Validation.js"
 *
 *   router.post("/", protect, validate(createProjectSchema), createProject)
 *   router.get("/", validate(mediaQuerySchema, "query"), getAllMedia)
 */
const validate = (schema, source = "body") => {
  return (req, res, next) => {
    const result = schema.safeParse(req[source]);

    if (!result.success) {
      // Flatten Zod errors into readable field → message pairs
      const errors = result.error.errors.map((err) => ({
        field:   err.path.join(".") || "value",
        message: err.message,
      }));

      return next(new ApiError(400, "Validation failed", errors));
    }

    // Replace req[source] with the parsed + transformed data (trimmed strings, defaults applied, etc.)
    req[source] = result.data;
    next();
  };
};

export { validate };
