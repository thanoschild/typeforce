export type Member = {
  id: string;
  username: string;
  image: string;
  isHost: boolean;
  progress?: {
    wpm: number;
    accuracy: number;
    progress: number;
  };
};

export type MemberProgressProps = {
  member: Member;
};
