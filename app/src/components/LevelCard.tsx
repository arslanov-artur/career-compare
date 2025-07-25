import React from "react";
import type { Level } from "../types";
import { formatSalary } from "../utils/formatters/salary.formatter";

type Props = {
  level: Level;
  isHighlighted?: boolean;
  hasMatch?: boolean;
  matchConfidence?: number;
  onClick: () => void;
};

const LevelCard: React.FC<Props> = ({
  level,
  isHighlighted = false,
  hasMatch = false,
  matchConfidence,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`
        relative p-4 rounded-xl border-2 cursor-pointer
        transition-all duration-200 hover:shadow-medium
        ${
          isHighlighted
            ? "border-emerald-500 bg-emerald-50"
            : "border-gray-200 bg-white hover:border-gray-300"
        }
      `}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
    >
      {hasMatch && matchConfidence && (
        <div className="absolute top-2 right-2">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-emerald-500 rounded-full" />
            <span className="text-xs text-gray-600">
              {matchConfidence}% match
            </span>
          </div>
        </div>
      )}

      <div className="inline-block px-2 py-1 bg-gray-100 rounded text-sm font-mono mb-2">
        {level.level}
      </div>

      <h3 className="font-semibold text-gray-900 mb-3">
        {level.title.replace(/([A-Z])/g, " $1").trim()}
      </h3>

      {level.minSalary && level.maxSalary && (
        <div className="mb-2">
          <div className="text-sm text-gray-600">Salary Range</div>
          <div className="font-medium text-gray-900">
            {formatSalary(level.minSalary)} - {formatSalary(level.maxSalary)}
          </div>
        </div>
      )}

      {level.yearsExperience && (
        <div className="text-sm text-gray-600">
          {level.yearsExperience} years experience
        </div>
      )}
    </div>
  );
};

export default LevelCard;
