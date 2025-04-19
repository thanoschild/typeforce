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
    bg: colorMatches.bg?.[1]?.trim() ?? '#ffffff',
    main: colorMatches.main?.[1]?.trim() ?? '#1a73e8',
    caret: colorMatches.caret?.[1]?.trim() ?? '#1a73e8',
    sub: colorMatches.sub?.[1]?.trim() ?? '#666666',
    subAlt: colorMatches.subAlt?.[1]?.trim() ?? '#888888',
    text: colorMatches.text?.[1]?.trim() ?? '#000000',
    error: colorMatches.error?.[1]?.trim() ?? '#d32f2f',
    errorExtra: colorMatches.errorExtra?.[1]?.trim() ?? '#ef5350',
    colorfulError: colorMatches.colorfulError?.[1]?.trim() ?? '#ff1744',
    colorfulErrorExtra: colorMatches.colorfulErrorExtra?.[1]?.trim() ?? '#ff5252',
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
  bg: '#ffffff',
  main: '#1a73e8',
  caret: '#1a73e8',
  sub: '#666666',
  subAlt: '#888888',
  text: '#000000',
  error: '#d32f2f',
  errorExtra: '#ef5350',
  colorfulError: '#ff1744',
  colorfulErrorExtra: '#ff5252'
};