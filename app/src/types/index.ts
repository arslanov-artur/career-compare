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
  wpromoteLevel: Level;
  tinuitiLevel: Level | null;
  confidence: number;
};
