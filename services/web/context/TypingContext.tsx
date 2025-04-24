'use client';

import { createContext, useContext, useReducer, useState } from 'react';
import { modes, timeOptions, wordOptions } from "@/constants";

// Derive types from the constant arrays
type Mode = typeof modes[number];
type TimeOption = typeof timeOptions[number];
type WordOption = typeof wordOptions[number];
type ModeOption = TimeOption | WordOption;

interface TypingContextType {
  mode: Mode;
  setMode: (mode: Mode) => void;
  modeOption: ModeOption;
  setModeOption: (option: ModeOption) => void;
  raceCompleted: boolean;
  setRaceCompleted: (completed: boolean) => void;
}

const TypingContext = createContext<TypingContextType | undefined>(undefined);

export function TypingProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<Mode>("words");
  const [modeOption, setModeOption] = useState<ModeOption>(10);
  const [raceCompleted, setRaceCompleted] = useState<boolean>(false);
    
  return (
    <TypingContext.Provider value={{ mode, setMode, modeOption, setModeOption, raceCompleted, setRaceCompleted }}>
      {children}
    </TypingContext.Provider>
  );
}

export function useTypingTest() {
  const context = useContext(TypingContext);
  if (!context) {
    throw new Error('useTypingTest must be used within a TypingProvider');
  }
  return context;
} 