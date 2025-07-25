import { useState, useEffect } from "react";

import type { Agency, Level, LevelMatch } from "./types";

// Dummy data instead of API
import { dummyData } from "./api/dummy";

import { findBestMatchingLevel } from "./utils/match/level.match";

import ComparisonView from "./components/ComparisonView";
import LevelDetail from "./components/LevelDetail";

export const App = () => {
  const [agencies, setAgencies] = useState<Agency[]>([]);
  const [matches, setMatches] = useState<LevelMatch[]>([]);
  const [selectedLevel, setSelectedLevel] = useState<{
    agency: string;
    level: Level;
  } | null>(null);

  useEffect(() => {
    const wpromote = dummyData.agencies.wpromote;
    const tinuiti = dummyData.agencies.tinuiti;

    setAgencies([wpromote, tinuiti]);

    const levelMatches: LevelMatch[] = wpromote.levels.map((wLevel) => {
      const { matchedLevel, confidenceScore } = findBestMatchingLevel(
        wLevel,
        tinuiti.levels,
      );

      return {
        wpromoteLevel: wLevel,
        tinuitiLevel: matchedLevel,
        confidence: Math.round(confidenceScore),
      };
    });

    setMatches(levelMatches);
  }, []);

  const handleLevelClick = (agency: string, level: Level) => {
    setSelectedLevel({ agency, level });
  };

  const closeDetail = () => {
    setSelectedLevel(null);
  };

  return (
    <div className="min-h-screen bg-neutral-background">
      <header className="bg-white shadow-soft border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900">
            Career Level Comparison
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Compare roles and salaries between agencies
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {agencies.length > 0 && (
          <ComparisonView
            agencies={agencies}
            matches={matches}
            onLevelClick={handleLevelClick}
          />
        )}
      </main>

      {selectedLevel && (
        <LevelDetail
          agency={agencies.find((a) => a.name === selectedLevel.agency)!}
          level={selectedLevel.level}
          match={matches.find(
            (m) =>
              m.wpromoteLevel.level === selectedLevel.level.level ||
              m.tinuitiLevel?.level === selectedLevel.level.level,
          )}
          onClose={closeDetail}
        />
      )}
    </div>
  );
};
