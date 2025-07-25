import type { Level } from "../../types";
import { SALARY_RANGE } from "../../const";

/**
 * Salary range validation for realistic data
 */
export const validateSalary = (level: Level): boolean => {
  if (!level.minSalary || !level.maxSalary) {
    return true;
  }

  const medianSalary = (level.minSalary + level.maxSalary) / 2;

  return medianSalary >= SALARY_RANGE.MIN && medianSalary <= SALARY_RANGE.MAX;
};
