"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useRef,
  useCallback,
  useLayoutEffect,
} from "react";
import { FontType, availableFonts, defaultFont } from "@/lib/font";

interface FontContextType {
  currentFont: FontType;
  setFont: (font: FontType) => void;
  availableFonts: typeof availableFonts;
}

const FontContext = createContext<FontContextType | undefined>(undefined);

export function FontProvider({ children }: { children: ReactNode }) {
  const [currentFont, setCurrentFont] = useState<FontType>(defaultFont);
  const alreadyApplied = useRef(false);

  const applyFont = useCallback((font: FontType) => {
    if (typeof document === "undefined") return;
    document.documentElement.style.fontFamily = `"${font}", monospace`;
  }, []);

  const setFont = useCallback(
    (font: FontType) => {
      setCurrentFont(font);
      applyFont(font);
      console.log("set font");
      localStorage.setItem("preferred-font", font);
    },
    [applyFont]
  );

  useLayoutEffect(() => {
    if (typeof window !== "undefined" && !alreadyApplied.current) {
      const savedFont = localStorage.getItem("preferred-font") || defaultFont;
      const validFont = availableFonts.includes(savedFont as FontType)
        ? (savedFont as FontType)
        : defaultFont;
      alreadyApplied.current = true;
      setFont(validFont);
    }
  }, [setFont]);

  return (
    <FontContext.Provider value={{ currentFont, setFont, availableFonts }}>
      {children}
    </FontContext.Provider>
  );
}

export function useFont() {
  const context = useContext(FontContext);
  if (context === undefined) {
    throw new Error("useFont must be used within a FontProvider");
  }
  return context;
}
