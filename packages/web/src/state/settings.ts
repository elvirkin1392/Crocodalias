import { LEVELS } from "../enums/settings";

export type SettingsContext = {
  level: LEVELS;
  time: number;
  score: number;
  teams: string[];
};

export type SettingsEvent =
  | { type: "OPEN_SCORE_SETTINGS" }
  | { type: "OPEN_TIME_SETTINGS" }
  | { type: "OPEN_LEVEL_SETTINGS" }
  | { type: "OPEN_TEAM_SETTINGS" }
  | { type: "SUBMIT_SCORE"; value: number }
  | { type: "SUBMIT_TIME"; value: number }
  | { type: "SUBMIT_TEAMS"; value: string[] }
  | { type: "SUBMIT_LEVEL"; value: LEVELS }
  | { type: "BACK" };
