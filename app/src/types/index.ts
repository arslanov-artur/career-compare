export type ExperienceRange = {
  min: number;
  max: number;
};

export type Level = {
  level: string;
  title: string;
  minSalary?: number;
  maxSalary?: number;
  yearsExperience?: string;
};

export type Agency = {
  name: string;
  logo: string;
  levels: Level[];
};

export type LevelMatch = {
  sourceLevel: Level;
  targetLevel: Level | null;
  sourceAgencyName: string;
  targetAgencyName: string;
  confidence: number;
};
