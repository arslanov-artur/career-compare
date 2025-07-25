import type { Level } from "../../types";

/**
 * Validates/corrects level data for consistency
 *
 * Negative salaries -> 0
 * max < min -> max = min
 * No title -> "Untitled Position"
 */
export const sanitizeLevelData = (level: Level): Level => {
  const sanitized = { ...level };

  if (!sanitized.title || sanitized.title.trim() === "") {
    sanitized.title = "Untitled Position";
  }

  if (sanitized.minSalary !== undefined && sanitized.maxSalary !== undefined) {
    sanitized.minSalary = Math.max(0, sanitized.minSalary);
    sanitized.maxSalary = Math.max(0, sanitized.maxSalary);

    if (sanitized.maxSalary < sanitized.minSalary) {
      // eslint-disable-next-line no-console
      console.warn(
        `Invalid salary range for ${level.title}: ` +
          `max ($${sanitized.maxSalary}) < min ($${sanitized.minSalary}). ` +
          "Setting max = min.",
      );
      sanitized.maxSalary = sanitized.minSalary;
    }
  }

  return sanitized;
};
