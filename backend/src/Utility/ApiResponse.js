/**
 * ApiResponse
 * Standardizes all successful API responses across the backend.
 * Every controller should use this instead of raw res.json().
 *
 * Usage:
 *   res.status(200).json(new ApiResponse(200, data, "Fetched successfully"))
 *   res.status(201).json(new ApiResponse(201, newRecord, "Created"))
 */
class ApiResponse {
  constructor(statusCode, data, message = "Success") {
    this.statusCode = statusCode;
    this.success = statusCode < 400;
    this.message = message;
    this.data = data;
  }
}

export default ApiResponse;
