'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type Font = 
  | 'Fira Code'
  | 'Inconsolata'
  | 'JetBrains Mono'
  | 'Roboto'
  | 'Ubuntu'
  | 'Nunito'
  | 'Montserrat'
  | 'Lato'
  | 'Lexend'
  | 'Oxygen'
  | 'Titillium'
  | 'Vazirmatn'
  | 'Itim'
  | 'Lalezar'
  | 'Comfortaa'
  | 'Coming Soon'
  | 'Atkinson'
  | 'Parkinsans'
  | 'Noto Naskh'
  | 'Hack'
  | 'IBM Plex Mono'
  | 'Geist Mono'
  | 'Cascadia'
  | 'Commit Mono'
  | 'Overpass Mono'
  | 'Mononoki'
  | 'Source Code'
  | 'Ubuntu Mono'
  | 'Roboto Mono'
  | 'Lexend Deca'
  | 'Berkeley Mono';

interface FontContextType {
  currentFont: Font;
  setFont: (font: Font) => void;
}

const FontContext = createContext<FontContextType | undefined>(undefined);

export const fonts: Font[] = [
  'Fira Code',
  'Inconsolata',
  'JetBrains Mono',
  'Roboto',
  'Ubuntu',
  'Nunito',
  'Montserrat',
  'Lato',
  'Lexend',
  'Oxygen',
  'Titillium',
  'Vazirmatn',
  'Itim',
  'Lalezar',
  'Comfortaa',
  'Coming Soon',
  'Atkinson',
  'Parkinsans',
  'Noto Naskh',
  'Hack',
  'IBM Plex Mono',
  'Geist Mono',
  'Cascadia',
  'Commit Mono',
  'Overpass Mono',
  'Mononoki',
  'Source Code',
  'Ubuntu Mono',
  'Roboto Mono',
  'Lexend Deca',
  'Berkeley Mono'
];

export function FontProvider({ children }: { children: ReactNode }) {
  const [currentFont, setCurrentFont] = useState<Font>('Roboto Mono');

  useEffect(() => {
    // Load saved font preference
    const savedFont = localStorage.getItem('preferred-font') as Font;
    if (savedFont && fonts.includes(savedFont)) {
      setCurrentFont(savedFont);
    }
  }, []);

  useEffect(() => {
    // Save font preference when it changes
    localStorage.setItem('preferred-font', currentFont);
  }, [currentFont]);

  const setFont = (font: Font) => {
    setCurrentFont(font);
  };

  return (
    <FontContext.Provider value={{ currentFont, setFont }}>
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