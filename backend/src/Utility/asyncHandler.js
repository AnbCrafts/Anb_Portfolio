/**
 * asyncHandler
 * Wraps an async Express route handler and forwards any thrown errors
 * to the global Express error handler via next(err).
 * Eliminates try/catch boilerplate in every controller.
 *
 * Usage:
 *   router.get('/route', asyncHandler(async (req, res) => { ... }))
 */
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

export default asyncHandler;
