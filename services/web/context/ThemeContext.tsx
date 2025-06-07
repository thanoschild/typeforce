'use client';

import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { ThemeColors, defaultTheme, getTheme, themeColorVariables, availableThemes } from '@/lib/theme';

interface ThemeContextValue {
  currentTheme: string;
  themeColors: ThemeColors;
  setTheme: (name: string) => Promise<void>;
  availableThemes: { id: string; name: string }[];
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState('carbon');
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

      if (name === 'carbon') {
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
      setCurrentTheme('carbon');
      setThemeColors(defaultTheme);
      applyThemeColors(defaultTheme);
    }
  }, [applyThemeColors]);

  // Initialize theme from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('selectedTheme') || 'carbon';
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