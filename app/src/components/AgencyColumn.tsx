import React from "react";

import type { Agency, Level, LevelMatch } from "../types";

import LevelCard from "./LevelCard";

import { hasValidMatch } from "../utils/ui";

type Props = {
  agency: Agency;
  matches: LevelMatch[];
  onLevelClick: (level: Level) => void;
};

const AgencyColumn: React.FC<Props> = ({ agency, matches, onLevelClick }) => {
  const getLevelMatch = (level: Level): LevelMatch | undefined => {
    return matches.find(
      (match) =>
        (match.sourceAgencyName === agency.name &&
          match.sourceLevel.level === level.level) ||
        (match.targetAgencyName === agency.name &&
          match.targetLevel?.level === level.level),
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow-soft py-2 md:py-6 px-2">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl flex items-center justify-center">
          <img
            src={agency.logo}
            alt={agency.name}
            className="w-12 h-12 rounded-xl"
          />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">{agency.name}</h2>
          <p className="text-sm text-gray-600">{agency.levels.length} levels</p>
        </div>
      </div>

      <div className="space-y-3">
        {agency.levels.map((level) => {
          const match = getLevelMatch(level);
          const hasMatch = match && hasValidMatch(match);

          return (
            <LevelCard
              key={level.level}
              level={level}
              hasMatch={!!hasMatch}
              matchConfidence={
                hasMatch && match ? Math.round(match.confidence) : undefined
              }
              onClick={() => onLevelClick(level)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default AgencyColumn;
