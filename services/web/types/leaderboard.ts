export type LeaderboardDataType = {
  rank: number;
  username: string;
  wpm: number;
  accuracy: number;
  time: number;
  mode: string;
  modeOptions: number;
  createdAt: Date;
};

export type LeaderboardEntry = Omit<LeaderboardDataType, "rank">;