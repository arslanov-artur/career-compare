import React from "react";

import type { Agency, Level, LevelMatch } from "../types";

import LevelCard from "./LevelCard";

import { hasValidMatch } from "../utils/ui";

type Props = {
  agency: Agency;
  matches: LevelMatch[];
  onLevelClick: (level: Level) => void;
  matchSide: "wpromote" | "tinuiti";
};

const AgencyColumn: React.FC<Props> = ({
  agency,
  matches,
  onLevelClick,
  matchSide,
}) => {
  const getLevelMatch = (level: Level): LevelMatch | undefined => {
    if (matchSide === "wpromote") {
      return matches.find((match) => match.wpromoteLevel.level === level.level);
    }

    return matches.find((match) => match.tinuitiLevel?.level === level.level);
  };

  return (
    <div className="bg-white rounded-2xl shadow-soft p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
          <span className="text-xl font-bold text-emerald-600">
            <img src={agency.logo} alt={agency.name} className="w-12 h-12" />
          </span>
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
