export type ResultProps = {
  wpm: number;
  accuracy: number;
  time: number;
  wpmData: { time: number; wpm: number }[];
  onRestart?: () => void;
  mode: string;
  modeOption: number;
};

export type AddTestTypes = Omit<ResultProps, "onRestart" | "wpmData">;
