'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { FontType, availableFonts, defaultFontId } from '@/lib/font'


interface FontContextType {
  currentFont: FontType;
  setFont: (font: FontType) => void;
  availableFonts: typeof availableFonts;
}

const FontContext = createContext<FontContextType | undefined>(undefined);

export function FontProvider({ children }: { children: ReactNode }) {
  const [currentFont, setCurrentFont] = useState<FontType>(defaultFontId);

  useEffect(() => {
    // Load saved font preference
    const savedFont = localStorage.getItem('preferred-font') as FontType;
    if (savedFont && savedFont in availableFonts) {
      setCurrentFont(savedFont);
    }
  }, []);

  useEffect(() => {
    // Save font preference when it changes
    localStorage.setItem('preferred-font', currentFont);
  }, [currentFont]);

  const setFont = (font: FontType) => {
    setCurrentFont(font);
  };

  return (
    <FontContext.Provider value={{ currentFont, setFont, availableFonts }}>
      {children}
    </FontContext.Provider>
  );
}

export function useFont() {
  const context = useContext(FontContext);
  if (context === undefined) {
    throw new Error('useFont must be used within a FontProvider');
  }
  return context;
} 