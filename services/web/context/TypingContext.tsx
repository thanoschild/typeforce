'use client';

import { ModeType, ModeOptionType } from '@/types/mode';
import { createContext, useContext, useReducer, useState } from 'react';


interface TypingContextType {
  mode: ModeType;
  setMode: (mode: ModeType) => void;
  modeOption: ModeOptionType;
  setModeOption: (option: ModeOptionType) => void;
  raceCompleted: boolean;
  setRaceCompleted: (completed: boolean) => void;
  resetTestFlag: boolean;
  setResetTestFlag: (flag: boolean) => void;
}

const TypingContext = createContext<TypingContextType | undefined>(undefined);

export function TypingProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<ModeType>("words");
  const [modeOption, setModeOption] = useState<ModeOptionType>(10);
  const [raceCompleted, setRaceCompleted] = useState<boolean>(false);
  const [resetTestFlag, setResetTestFlag] = useState<boolean>(false);
    
  return (
    <TypingContext.Provider value={{ mode, setMode, modeOption, setModeOption, raceCompleted, setRaceCompleted, resetTestFlag, setResetTestFlag }}>
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