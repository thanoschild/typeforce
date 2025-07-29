"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  useLayoutEffect,
} from "react";
import { ThemeColors, themeColorVariables, availableThemes, defaultTheme, defaultThemeColors, getThemeColors } from "@/lib/theme";

interface ThemeContextValue {
  currentTheme: string;
  themeColors: ThemeColors;
  setTheme: (name: string) => Promise<void>;
  availableThemes: Record<string, { name: string; type: "dark" | "light" }>;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState(defaultTheme);
  const [themeColors, setThemeColors] = useState<ThemeColors>(defaultThemeColors);
  const alreadyApplied = useRef(false);

  const applyThemeColors = useCallback((colors: ThemeColors) => {
    if (typeof document === "undefined") return;

    const root = document.documentElement;

    // Apply theme variables
    for (const key in themeColorVariables) {
      const cssVar =
        themeColorVariables[key as keyof typeof themeColorVariables];
      const value = colors[key as keyof ThemeColors];
      root.style.setProperty(cssVar, value);
    }
  }, []);

  const setTheme = useCallback(
    async (themeId: string) => {
      try {
        const colors: ThemeColors = await getThemeColors(themeId);
        setCurrentTheme(themeId);
        setThemeColors(colors);
        applyThemeColors(colors);
        localStorage.setItem("typeforce-theme", themeId);
      } catch (error) {
        console.error("Failed to set theme:", error);
        setCurrentTheme(defaultTheme);
        setThemeColors(defaultThemeColors);
        applyThemeColors(defaultThemeColors);
      }
    },
    [applyThemeColors]
  );

  // Initialize theme from localStorage on mount
  useLayoutEffect(() => {
    if (typeof window !== "undefined" && !alreadyApplied.current) {
      const savedTheme = localStorage.getItem("typeforce-theme") || defaultTheme;
      alreadyApplied.current = true;
      setTheme(savedTheme);
    }
  }, [setTheme]);

  return (
    <ThemeContext.Provider
      value={{
        currentTheme,
        themeColors,
        setTheme,
        availableThemes,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}
