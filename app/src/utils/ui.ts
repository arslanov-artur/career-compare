import type { LevelMatch } from "../types";
import { MINIMUM_MATCH_CONFIDENCE } from "../const";

/**
 * Checks if a level match is valid
 */
export const hasValidMatch = (match: LevelMatch): boolean => {
  return (
    match.targetLevel !== null && match.confidence >= MINIMUM_MATCH_CONFIDENCE
  );
};

/**
 * Formats confidence score for display ("85%")
 */
export const formatConfidencePercentage = (confidence: number): string => {
  return `${Math.round(confidence)}%`;
};

/**
 * Readable description of match quality
 */
/*export const getMatchQualityDescription = (confidence: number): string => {
  if (confidence >= 90) return 'High';
  if (confidence >= 75) return 'Medium';
  if (confidence >= 50) return 'Low';
  return 'No Match';
};*/
