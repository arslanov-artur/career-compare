import type { Agency, LevelMatch } from "../../types";
import { findBestMatchingLevel } from "../match/level.match";
import { sanitizeLevelData } from "../validations/level.validation";

/**
 * Maps career levels between Wpromote and Tinuiti agencies
 *
 * 1. Validates, sanitizes input data
 * 2. For each Wpromote level, find best Tinuiti match
 * 3. Return matches with confidence scores
 *
 * Not all levels will have matches (confidence < 50%)
 */
export const mapCareerLevels = (
  wpromoteAgency: Agency,
  tinuitiAgency: Agency,
): LevelMatch[] => {
  if (!wpromoteAgency?.levels || !tinuitiAgency?.levels) {
    // eslint-disable-next-line no-console
    console.error("Invalid agency data");
    return [];
  }

  const sanitizedWpromoteLevels = wpromoteAgency.levels.map(sanitizeLevelData);
  const sanitizedTinuitiLevels = tinuitiAgency.levels.map(sanitizeLevelData);

  if (sanitizedWpromoteLevels.length === 0) {
    // eslint-disable-next-line no-console
    console.warn("Wpromote has no career levels");
    return [];
  }

  const levelMatches: LevelMatch[] = sanitizedWpromoteLevels.map(
    (wpromoteLevel) => {
      const matchResult = findBestMatchingLevel(
        wpromoteLevel,
        sanitizedTinuitiLevels,
      );

      return {
        wpromoteLevel: wpromoteLevel,
        tinuitiLevel: matchResult.matchedLevel,
        confidence: matchResult.confidenceScore,
      };
    },
  );

  return levelMatches;
};
