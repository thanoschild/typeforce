export const availableFonts = [
  "Fira Code",
  "Inconsolata",
  "JetBrains Mono",
  "IBM Plex Mono",
  "Geist Mono",
  "Cascadia",
  "Commit Mono",
  "Overpass Mono",
  "Mononoki",
  "Source Code",
  "Ubuntu Mono",
  "Roboto Mono",
  "Berkeley Mono",
  "Hack",
  "Lexend",
  "Oxygen",
  "Titillium",
  "Vazirmatn",
  "Parkinsans",
  "Lexend Deca",
  "Itim",
] as const;

export type FontType = typeof availableFonts[number];

export const defaultFont: FontType = "Roboto Mono";

// Helper functions
export const get_all_fonts = (): FontType[] => [...availableFonts];

export const get_font_name = (fontName: FontType): string => fontName;
