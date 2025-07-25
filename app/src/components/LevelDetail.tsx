import React, { useEffect, useState } from "react";

import type { Agency, Level, LevelMatch } from "../types";

import { useMediaQuery } from "../hooks/useMediaQuery";

import { formatSalary } from "../utils/formatters/salary.formatter";

type Props = {
  agency: Agency;
  level: Level;
  match?: LevelMatch;
  onClose: () => void;
};

const LevelDetail: React.FC<Props> = ({ agency, level, match, onClose }) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => {
      setIsVisible(true);
    });

    if (isMobile) {
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;

      document.body.style.overflow = "hidden";
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }

      return () => {
        document.body.style.overflow = "";
        document.body.style.paddingRight = "";
      };
    }
  }, [isMobile]);

  const content = (
    <div
      className={`bg-white ${isMobile ? "p-4" : "rounded-2xl p-6 border border-gray-200 shadow-medium"}`}
    >
      <div
        className={`flex justify-between items-start ${isMobile ? "mb-4" : "mb-6"}`}
      >
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center">
              <img
                src={agency.logo}
                alt={agency.name}
                className="w-10 h-10 rounded-xl"
              />
            </div>
            <span className="text-sm text-gray-600">{agency.name}</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            {level.title.replace(/([A-Z])/g, " $1").trim()}
          </h2>
          <span className="inline-block mt-1 px-2 py-1 bg-gray-100 rounded text-sm font-mono">
            {level.level}
          </span>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
          aria-label="Close"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      {level.minSalary && level.maxSalary && (
        <div className={isMobile ? "mb-4" : "mb-6"}>
          <h3
            className={`text-lg font-semibold ${isMobile ? "mb-2" : "mb-3"} text-gray-900`}
          >
            Compensation
          </h3>
          <div className={`bg-gray-50 ${isMobile ? "p-3" : "p-4"} rounded-xl`}>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Salary Range:</span>
              <span className="font-medium text-gray-900">
                {formatSalary(level.minSalary)} -{" "}
                {formatSalary(level.maxSalary)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Median:</span>
              <span className="font-medium text-gray-900">
                {formatSalary((level.minSalary + level.maxSalary) / 2)}
              </span>
            </div>
          </div>
        </div>
      )}

      {level.yearsExperience && (
        <div className={isMobile ? "mb-4" : "mb-6"}>
          <h3
            className={`text-lg font-semibold ${isMobile ? "mb-2" : "mb-3"} text-gray-900`}
          >
            Experience Required
          </h3>
          <p className="text-gray-700">{level.yearsExperience} years</p>
        </div>
      )}

      {match &&
        (() => {
          const isSource = agency.name === match.sourceAgencyName;
          const matchedLevel = isSource ? match.targetLevel : match.sourceLevel;
          const matchedAgencyName = isSource
            ? match.targetAgencyName
            : match.sourceAgencyName;

          if (!matchedLevel) return null;

          return (
            <div className={`border-t ${isMobile ? "pt-4" : "pt-6"}`}>
              <h3
                className={`text-lg font-semibold ${isMobile ? "mb-2" : "mb-3"} text-gray-900`}
              >
                Equivalent Position
              </h3>

              <div
                className={`bg-emerald-50 ${isMobile ? "p-3" : "p-4"} rounded-xl`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="font-medium text-gray-900">
                      {matchedLevel.title.replace(/([A-Z])/g, " $1").trim()}
                    </p>
                    <p className="text-sm text-gray-600">{matchedAgencyName}</p>
                  </div>
                  <span className="text-sm bg-emerald-600 text-white px-2 py-1 rounded">
                    {Math.round(match.confidence)}% match
                  </span>
                </div>

                {matchedLevel.minSalary &&
                  matchedLevel.maxSalary &&
                  level.minSalary &&
                  level.maxSalary && (
                    <div className="mt-3 pt-3 border-t border-emerald-200">
                      <p className="text-sm text-gray-600 mb-1">
                        Salary Difference:
                      </p>
                      <p className="font-medium text-gray-900">
                        {(() => {
                          const currentMedian =
                            (level.minSalary + level.maxSalary) / 2;
                          const matchMedian =
                            (matchedLevel.minSalary + matchedLevel.maxSalary) /
                            2;
                          const diff = currentMedian - matchMedian;

                          const percentage =
                            matchMedian !== 0 ? (diff / matchMedian) * 100 : 0;

                          if (diff === 0) {
                            return <>No difference</>;
                          }

                          return (
                            <>
                              {diff > 0 ? "+" : ""}
                              {formatSalary(Math.abs(diff))} (
                              {diff > 0 ? "+" : "-"}
                              {Math.abs(percentage).toFixed(1)}%)
                            </>
                          );
                        })()}
                      </p>
                    </div>
                  )}
              </div>
            </div>
          );
        })()}
    </div>
  );

  if (isMobile) {
    return (
      <div
        className={`fixed inset-0 bg-white z-50 overflow-y-auto transition-opacity duration-100 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        {content}
      </div>
    );
  }

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-100 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />
      <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
        <div
          className={`max-w-2xl w-full max-h-[90vh] overflow-y-auto transition-all duration-100 ${
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          {content}
        </div>
      </div>
    </>
  );
};

export default LevelDetail;
