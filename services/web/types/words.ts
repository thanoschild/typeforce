export interface Letter {
  original?: string;
  typed?: string;
  status?: 'correct' | 'incorrect' | 'extra' | 'missed';
}

export interface Word {
  original: string;
  typed?: string;
  letters: Letter[];
  isCorrect: boolean;
}