/**
 * ApiError
 * Custom error class for structured API error responses.
 * Extends native Error so it works seamlessly with Express's
 * global error handler and asyncHandler.
 *
 * Usage:
 *   throw new ApiError(404, "Resource not found")
 *   throw new ApiError(400, "Validation failed", errors)
 */
class ApiError extends Error {
  constructor(statusCode, message = "Something went wrong", errors = [], stack = "") {
    super(message);

    this.statusCode = statusCode;
    this.message = message;
    this.success = false;
    this.errors = errors; // Array of field-level validation errors

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default ApiError;
