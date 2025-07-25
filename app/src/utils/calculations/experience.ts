import type { ExperienceRange } from "../../types";

/**
 * Calculates abstract "confidence" value based on salary and experience
 *
 * [0-2] and [5-7] = 0%
 * [2-4] and [3-5] = 33%
 * [2-4] and [2-4] = 100%
 */
export const calculateExperienceOverlapPercentage = (
  range1: ExperienceRange,
  range2: ExperienceRange,
): number => {
  if (range1.max === 0 || range2.max === 0) {
    return 0;
  }

  const overlapStart = Math.max(range1.min, range2.min);
  const overlapEnd = Math.min(range1.max, range2.max);

  if (overlapStart > overlapEnd) {
    return 0;
  }

  const overlapYears = overlapEnd - overlapStart;
  const totalRangeStart = Math.min(range1.min, range2.min);
  const totalRangeEnd = Math.max(range1.max, range2.max);
  const totalRangeYears = totalRangeEnd - totalRangeStart;

  return totalRangeYears > 0 ? (overlapYears / totalRangeYears) * 100 : 0;
};
