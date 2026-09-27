/**
 * Helper to dynamically calculate years of experience from career start date.
 * Auto-increments over time without needing manual code updates.
 *
 * @param {string} startDateStr - ISO format date string (default: "2024-09-01" for 1 year experience as of Sept 2025/2026)
 * @returns {string} Formatted experience label (e.g., "1", "1+", "2", "2+")
 */
export function getDynamicYearsOfExperience(startDateStr = "2025-09-01") {
  const startDate = new Date(startDateStr);
  const now = new Date();

  // Calculate total months difference
  const totalMonths = (now.getFullYear() - startDate.getFullYear()) * 12 + (now.getMonth() - startDate.getMonth());
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  // If under 1 year, display 1
  if (years < 1) {
    return "1";
  }

  // If there are extra months beyond full years (e.g. 1 year 3 months -> 1+)
  if (months >= 3) {
    return `${years}+`;
  }

  return `${years}`;
}
