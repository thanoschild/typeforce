import { Dispatch } from "react";
import { Member } from "./member";
import { Room } from "./room";

export type RaceProps = {
  members: Member[];
  isRaceStarted: boolean;
  setIsRaceStarted: Dispatch<React.SetStateAction<boolean>>;
  roomData: Room | null;
  raceText: string;
};

export type InterfaceProps = {
  mode: string;
  modeOption: number;
  text: string;
  onProgress: (wpm: number, accuracy: number, progress: number) => void;
};
