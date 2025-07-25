// Identify unrealistic data
export const SALARY_RANGE = {
  MIN: 60000, // less than 500$ per month - unrealistic
  MAX: 1000000, // more than 80000$ per month - unrealistic
} as const;

// 5+ years -> 5-10 years
export const ESTIMATED_EXPERIENCE_RANGE_FOR_PLUS = 5;

// abstract "confidence" value based on salary and experience
export const MINIMUM_MATCH_CONFIDENCE = 50;

// Calculating match confidence (what's more important?)
export const MATCH_WEIGHTS = {
  EXPERIENCE: 0.6,
  SALARY: 0.4,
} as const;
