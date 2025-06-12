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

interface ThemeJSON {
  '--bg-color'?: string;
  '--main-color'?: string;
  '--caret-color'?: string;
  '--sub-color'?: string;
  '--sub-alt-color'?: string;
  '--text-color'?: string;
  '--error-color'?: string;
  '--error-extra-color'?: string;
  '--colorful-error-color'?: string;
  '--colorful-error-extra-color'?: string;
}

export const defaultTheme = "carbon";

export const defaultThemeColors: ThemeColors = {
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

export const availableThemes: Record<string, { name: string; type: 'dark' | 'light' }> = {
  carbon: { name: 'carbon', type: 'dark' },
  vscode: { name: 'vscode', type: 'dark' },
  tangerine: { name: 'tangerine', type: 'light' },
  terminal: { name: 'terminal', type: 'dark' },
  rose: { name: 'rose', type: 'dark' },
  camping: { name: 'camping', type: 'light' },
  shadow: { name: 'shadow', type: 'dark' },
  milkshake: { name: 'milkshake', type: 'light' },
  paper: { name: 'paper', type: 'light' },
  raspberry: { name: 'raspberry', type: 'light' },
};

export function extractThemeColors(json: ThemeJSON): ThemeColors {
  return {
    bg: json['--bg-color']?.trim() ?? '#313131',
    main: json['--main-color']?.trim() ?? '#f66e0d',
    caret: json['--caret-color']?.trim() ?? '#f66e0d',
    sub: json['--sub-color']?.trim() ?? '#616161',
    subAlt: json['--sub-alt-color']?.trim() ?? '#2b2b2b',
    text: json['--text-color']?.trim() ?? '#f5e6c8',
    error: json['--error-color']?.trim() ?? '#e72d2d',
    errorExtra: json['--error-extra-color']?.trim() ?? '#7e2a33',
    colorfulError: json['--colorful-error-color']?.trim() ?? '#e72d2d',
    colorfulErrorExtra: json['--colorful-error-extra-color']?.trim() ?? '#7e2a33',
  };
}

export async function getThemeColors(name: string): Promise<ThemeColors> {
  try {
    const response = await fetch(`themes/${name}.json`);
    if (!response.ok) {
      throw new Error(`Failed to load theme: ${name}`);
    }
    const json = await response.json();
    return extractThemeColors(json);
  } catch (error) {
    console.error(`Failed to load theme: ${name}`, error);
    return defaultThemeColors;
  }
}
