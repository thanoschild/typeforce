export interface ThemeColors {
  bg: string;
  main: string;
  caret: string;
  sub: string;
  subAlt: string;
  text: string;
  error: string;
  errorExtra: string;
  colorfulError: string;
  colorfulErrorExtra: string;
}

export interface CustomTheme {
  id: string;
  name: string;
  colors: ThemeColors;
}

export const themeColorVariables = {
  bg: '--bg-color',
  main: '--main-color',
  caret: '--caret-color',
  sub: '--sub-color',
  subAlt: '--sub-alt-color',
  text: '--text-color',
  error: '--error-color',
  errorExtra: '--error-extra-color',
  colorfulError: '--colorful-error-color',
  colorfulErrorExtra: '--colorful-error-extra-color',
} as const;

export const availableThemes = [
  { id: 'carbon', name: 'carbon' },
  { id: 'vscode', name: 'vscode' },
  { id: 'tangerine', name: 'tangerine' },
  { id: 'solarized_light', name: 'solarized light' },
  { id: 'terminal', name: 'terminal' },
  { id: 'dracula', name: 'dracula' },
  { id: 'onedark', name: 'one dark' },
  
];

export function extractThemeColors(cssContent: string): ThemeColors {
  const colorMatches = {
    bg: cssContent.match(/--bg-color:\s*([^;]+);/),
    main: cssContent.match(/--main-color:\s*([^;]+);/),
    caret: cssContent.match(/--caret-color:\s*([^;]+);/),
    sub: cssContent.match(/--sub-color:\s*([^;]+);/),
    subAlt: cssContent.match(/--sub-alt-color:\s*([^;]+);/),
    text: cssContent.match(/--text-color:\s*([^;]+);/),
    error: cssContent.match(/--error-color:\s*([^;]+);/),
    errorExtra: cssContent.match(/--error-extra-color:\s*([^;]+);/),
    colorfulError: cssContent.match(/--colorful-error-color:\s*([^;]+);/),
    colorfulErrorExtra: cssContent.match(/--colorful-error-extra-color:\s*([^;]+);/),
  };

  return {
    bg: colorMatches.bg?.[1]?.trim() ?? '#191a1b;',
    main: colorMatches.main?.[1]?.trim() ?? '#79a617',
    caret: colorMatches.caret?.[1]?.trim() ?? '#79a617',
    sub: colorMatches.sub?.[1]?.trim() ?? '#48494b',
    subAlt: colorMatches.subAlt?.[1]?.trim() ?? '#141516',
    text: colorMatches.text?.[1]?.trim() ?? '#e7eae0',
    error: colorMatches.error?.[1]?.trim() ?? '#a61717',
    errorExtra: colorMatches.errorExtra?.[1]?.trim() ?? '#731010',
    colorfulError: colorMatches.colorfulError?.[1]?.trim() ?? '#a61717',
    colorfulErrorExtra: colorMatches.colorfulErrorExtra?.[1]?.trim() ?? '#731010',
  };
}

export async function getTheme(name: string): Promise<ThemeColors> {
  try {
    // Use fetch to load the theme file
    const response = await fetch(`/static/themes/${name}.css`);
    if (!response.ok) {
      throw new Error(`Failed to load theme: ${name}`);
    }
    const cssContent = await response.text();
    return extractThemeColors(cssContent);
  } catch (error) {
    console.error(`Failed to load theme: ${name}`, error);
    // Fallback to default theme if loading fails
    return defaultTheme;
  }
}

// Default theme colors
export const defaultTheme: ThemeColors = {
  bg: '#313131',
  main: '#f66e0d',
  caret: '#f66e0d',
  sub: '#616161',
  subAlt: '#2b2b2b',
  text: '#f5e6c8',
  error: '#e72d2d',
  errorExtra: '#7e2a33',
  colorfulError: '#e72d2d',
  colorfulErrorExtra: '#7e2a33'
};

export function getThemeNameById(id: string): string {
  const theme = availableThemes.find(theme => theme.id === id);
  return theme ? theme.name : "Unknown Theme";
}