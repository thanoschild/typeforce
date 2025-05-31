export type LeaderboardDataType = {
  rank: number;
  username: string;
  wpm: number;
  accuracy: number;
  time: number;
  mode: string;
};

export type LeaderboardEntry = Omit<LeaderboardDataType, "rank">;