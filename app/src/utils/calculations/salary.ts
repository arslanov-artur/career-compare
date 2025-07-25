import type { Level } from "../../types";

/**
 * Calculates salary similarity between two levels (0-100%)
 *
 * $50K - $100K -> 33% similarity
 * $50K - $60K -> ~82% similarity
 * $50K - $50K -> 100% similarity
 */
export const calculateSalarySimilarity = (
  level1: Level,
  level2: Level,
): number => {
  if (
    !level1.minSalary ||
    !level1.maxSalary ||
    !level2.minSalary ||
    !level2.maxSalary
  ) {
    return 0;
  }

  const level1Median = (level1.minSalary + level1.maxSalary) / 2;
  const level2Median = (level2.minSalary + level2.maxSalary) / 2;

  if (level1Median <= 0 || level2Median <= 0) {
    return 0;
  }

  const averageMedian = (level1Median + level2Median) / 2;
  const absoluteDifference = Math.abs(level1Median - level2Median);
  const percentageDifference = (absoluteDifference / averageMedian) * 100;

  return Math.max(0, 100 - percentageDifference);
};
