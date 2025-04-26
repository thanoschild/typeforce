'use client';

import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { ThemeColors, defaultTheme, getTheme, themeColorVariables } from '@/lib/theme';

interface ThemeContextValue {
  currentTheme: string;
  themeColors: ThemeColors;
  setTheme: (name: string) => Promise<void>;
  availableThemes: { id: string; name: string }[];
}

const availableThemes = [
  { id: 'default', name: 'Default' },
  { id: 'nord', name: 'Nord' },
  { id: 'monokai', name: 'Monokai' },
  { id: 'dracula', name: 'Dracula' },
  { id: 'solarized_dark', name: 'Solarized Dark' },
  { id: 'solarized_light', name: 'Solarized Light' },
  { id: 'rose_pine', name: 'Rose Pine' },
  { id: 'moonlight', name: 'Moonlight' },
  { id: 'onedark', name: 'One Dark' },
];

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState('default');
  const [themeColors, setThemeColors] = useState<ThemeColors>(defaultTheme);

  const applyThemeColors = useCallback((colors: ThemeColors) => {
    if (typeof document === 'undefined') return;

    const root = document.documentElement;
    
    // Clear existing theme variables
    Object.values(themeColorVariables).forEach((cssVar) => {
      root.style.removeProperty(cssVar);
    });

    // Apply new theme colors
    Object.entries(colors).forEach(([key, value]) => {
      const cssVar = themeColorVariables[key as keyof typeof themeColorVariables];
      if (cssVar) {
        root.style.setProperty(cssVar, value);
      }
    });

    // Force a re-paint to ensure styles are applied
    const currentClass = root.getAttribute('data-theme') || '';
    root.setAttribute('data-theme', currentClass === 'theme-a' ? 'theme-b' : 'theme-a');
  }, []);

  const setTheme = useCallback(async (name: string) => {
    try {
      console.log(`Setting theme to: ${name}`);
      let colors: ThemeColors;
      if (name === 'default') {
        colors = defaultTheme;
      } else {
        colors = await getTheme(name);
      }
      setCurrentTheme(name);
      setThemeColors(colors);
      applyThemeColors(colors);
      localStorage.setItem('selectedTheme', name);
    } catch (error) {
      console.error('Failed to set theme:', error);
      setCurrentTheme('default');
      setThemeColors(defaultTheme);
      applyThemeColors(defaultTheme);
    }
  }, [applyThemeColors]);

  // Initialize theme from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('selectedTheme') || 'default';
      setTheme(savedTheme);
    }
  }, [setTheme]);

  return (
    <ThemeContext.Provider value={{
      currentTheme,
      themeColors,
      setTheme,
      availableThemes
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
} 