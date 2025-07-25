import type { Agency, LevelMatch } from "../../types";
import { findBestMatchingLevel } from "../match/level.match";
import { sanitizeLevelData } from "../validations/level.validation";

/**
 * Maps career levels between two agencies
 *
 * 1. Validates, sanitizes input data
 * 2. For each source level, find best target match
 * 3. Return matches with confidence scores
 *
 * Not all levels will have matches (confidence < 50%)
 */
export const mapCareerLevels = (
  sourceAgency: Agency,
  targetAgency: Agency,
): LevelMatch[] => {
  if (!sourceAgency?.levels || !targetAgency?.levels) {
    // eslint-disable-next-line no-console
    console.error("Invalid agency data");
    return [];
  }

  const sanitizedSourceLevels = sourceAgency.levels.map(sanitizeLevelData);
  const sanitizedTargetLevels = targetAgency.levels.map(sanitizeLevelData);

  if (sanitizedSourceLevels.length === 0) {
    // eslint-disable-next-line no-console
    console.warn(`${sourceAgency.name} has no career levels`);
    return [];
  }

  const levelMatches: LevelMatch[] = sanitizedSourceLevels.map(
    (sourceLevel) => {
      const matchResult = findBestMatchingLevel(
        sourceLevel,
        sanitizedTargetLevels,
      );

      return {
        sourceLevel: sourceLevel,
        targetLevel: matchResult.matchedLevel,
        sourceAgencyName: sourceAgency.name,
        targetAgencyName: targetAgency.name,
        confidence: matchResult.confidenceScore,
      };
    },
  );

  return levelMatches;
};
