import type { Level } from "../../types";
import { MATCH_WEIGHTS, MINIMUM_MATCH_CONFIDENCE } from "../../const";
import { parseExperienceString } from "../parsers/experience.parser";
import { calculateExperienceOverlapPercentage } from "../calculations/experience";
import { calculateSalarySimilarity } from "../calculations/salary";

/**
 * Finds the best matching level
 *
 * Parse experience ranges
 * Calculate weighted confidence score (60% experience, 40% salary)
 * Return best match only if confidence >= 50%
 *
 * Returns "confidence" value (0-100%)
 */
export const findBestMatchingLevel = (
  sourceLevel: Level,
  candidateLevels: Level[],
): { matchedLevel: Level | null; confidenceScore: number } => {
  if (candidateLevels.length === 0) {
    return { matchedLevel: null, confidenceScore: 0 };
  }

  let bestCandidate: Level | null = null;
  let highestConfidence = 0;

  const sourceExperience = parseExperienceString(sourceLevel.yearsExperience);

  for (const candidate of candidateLevels) {
    const candidateExperience = parseExperienceString(
      candidate.yearsExperience,
    );

    const experienceOverlap = calculateExperienceOverlapPercentage(
      sourceExperience,
      candidateExperience,
    );
    const salarySimilarity = calculateSalarySimilarity(sourceLevel, candidate);

    const weightedExperienceScore =
      experienceOverlap * MATCH_WEIGHTS.EXPERIENCE;
    const weightedSalaryScore = salarySimilarity * MATCH_WEIGHTS.SALARY;
    const totalConfidence = weightedExperienceScore + weightedSalaryScore;

    if (totalConfidence > highestConfidence) {
      highestConfidence = totalConfidence;
      bestCandidate = candidate;
    }
  }

  return {
    matchedLevel:
      highestConfidence >= MINIMUM_MATCH_CONFIDENCE ? bestCandidate : null,
    confidenceScore: highestConfidence,
  };
};
