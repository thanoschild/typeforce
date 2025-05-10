import { Mode, ModeOptionType } from "@/types/mode";

export interface RoomFormData {
  name: string;
  mode: Mode;
  modeOption: ModeOptionType;
}

type Room = {
  mode: string;
  modeOption: number;
  name: string;
  id: string;
  code: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
};

export type MultiplayerHeaderProps = {
  roomData: Room | null;
  isHost: boolean;
  isRaceStarted: boolean;
};