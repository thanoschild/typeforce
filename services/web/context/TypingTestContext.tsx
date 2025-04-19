'use client';

import { createContext, useContext, useReducer } from 'react';
import { Language } from '../types/language';
import { languages } from '../static/languages/languages';

interface TypingTestState {
  words: Array<{
    original: string;
    letters: Array<{
      original: string;
      typed: string;
      isCorrect: boolean;
    }>;
    isCorrect: boolean;
  }>;
  wordIndex: number;
  inputValue: string;
  isTestRunning: boolean;
  mode: 'time' | 'words';
  wordAmount?: number;
  language: Language;
}

type TypingTestAction = 
  | { type: 'SET_VALUES'; payload: Partial<TypingTestState> }
  | { type: 'UPDATE_VALUES'; payload: (draft: TypingTestState) => void };

const initialState: TypingTestState = {
  words: [],
  wordIndex: 0,
  inputValue: '',
  isTestRunning: false,
  mode: 'words',
  wordAmount: 25,
  language: languages.english,
};

function reducer(state: TypingTestState, action: TypingTestAction): TypingTestState {
  switch (action.type) {
    case 'SET_VALUES':
      return { ...state, ...action.payload };
    case 'UPDATE_VALUES':
      const draft = { ...state };
      action.payload(draft);
      return draft;
    default:
      return state;
  }
}

const TypingTestContext = createContext<{
  state: TypingTestState;
  setValues: (values: Partial<TypingTestState> | ((draft: TypingTestState) => void)) => void;
}>({
  state: initialState,
  setValues: () => {},
});

export function TypingTestProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setValues = (values: Partial<TypingTestState> | ((draft: TypingTestState) => void)) => {
    if (typeof values === 'function') {
      dispatch({ type: 'UPDATE_VALUES', payload: values });
    } else {
      dispatch({ type: 'SET_VALUES', payload: values });
    }
  };

  return (
    <TypingTestContext.Provider value={{ state, setValues }}>
      {children}
    </TypingTestContext.Provider>
  );
}

export function useTypingTest() {
  const context = useContext(TypingTestContext);
  if (!context) {
    throw new Error('useTypingTest must be used within a TypingTestProvider');
  }
  return { ...context.state, setValues: context.setValues };
} 