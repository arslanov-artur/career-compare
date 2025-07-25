import React, { useState } from "react";

import type { Agency, Level, LevelMatch } from "../types";

import { useMediaQuery } from "../hooks/useMediaQuery";

import AgencyColumn from "./AgencyColumn";

type Props = {
  agencies: Agency[];
  matches: LevelMatch[];
  onLevelClick: (agency: string, level: Level) => void;
};

const ComparisonView: React.FC<Props> = ({
  agencies,
  matches,
  onLevelClick,
}) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [activeTab, setActiveTab] = useState<number>(0);

  if (isMobile) {
    return (
      <div className="bg-white rounded-2xl shadow-soft">
        <div className="flex border-b border-gray-200">
          {agencies.map((agency, index) => (
            <button
              key={agency.name}
              type="button"
              className={`flex-1 py-3 px-4 font-medium transition-colors ${
                activeTab === index
                  ? "text-emerald-600 border-b-2 border-emerald-600"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab(index)}
            >
              {agency.name}
            </button>
          ))}
        </div>

        <div className="p-4">
          <AgencyColumn
            agency={agencies[activeTab]}
            matches={matches}
            onLevelClick={(level) =>
              onLevelClick(agencies[activeTab].name, level)
            }
            matchSide={activeTab === 0 ? "wpromote" : "tinuiti"}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {agencies.map((agency, index) => (
        <AgencyColumn
          key={agency.name}
          agency={agency}
          matches={matches}
          onLevelClick={(level) => onLevelClick(agency.name, level)}
          matchSide={index === 0 ? "wpromote" : "tinuiti"}
        />
      ))}
    </div>
  );
};

export default ComparisonView;
