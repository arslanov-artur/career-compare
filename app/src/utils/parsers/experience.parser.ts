import type { ExperienceRange } from "../../types";
import { ESTIMATED_EXPERIENCE_RANGE_FOR_PLUS } from "../../const";

const INVALID_EXPERIENCE_RANGE = {
  min: 0,
  max: 0,
} as const;

/**
 * Parses different potential experience string formats into a normalized one
 *
 * 2-4 → { min: 2, max: 4 }
 * 5+ → { min: 5, max: 10 }
 * 3 → { min: 3, max: 3 }
 * invalid data → { min: 0, max: 0 }
 */
export const parseExperienceString = (
  experienceStr?: string,
): ExperienceRange => {
  if (!experienceStr || experienceStr.trim() === "") {
    return INVALID_EXPERIENCE_RANGE;
  }

  const trimmedExperience = experienceStr.trim();

  if (trimmedExperience.includes("+")) {
    const minYears = parseInt(trimmedExperience);
    if (isNaN(minYears)) {
      return INVALID_EXPERIENCE_RANGE;
    }

    return {
      min: minYears,
      max: minYears + ESTIMATED_EXPERIENCE_RANGE_FOR_PLUS,
    };
  }

  if (trimmedExperience.includes("-")) {
    const [minStr, maxStr] = trimmedExperience.split("-");
    const min = parseInt(minStr);
    const max = parseInt(maxStr);

    if (isNaN(min) || isNaN(max)) {
      return INVALID_EXPERIENCE_RANGE;
    }

    return {
      min: Math.min(min, max),
      max: Math.max(min, max),
    };
  }

  const exactYears = parseInt(trimmedExperience);
  if (!isNaN(exactYears)) {
    return {
      min: exactYears,
      max: exactYears,
    };
  }

  return INVALID_EXPERIENCE_RANGE;
};
