import type { Config } from 'tailwindcss';

const config = {
    darkMode: ['class'],
    content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
  	extend: {
  		colors: {
  			theme: {
  				bg: 'var(--bg-color)',
  				main: 'var(--main-color)',
  				caret: 'var(--caret-color)',
  				sub: 'var(--sub-color)',
  				'sub-alt': 'var(--sub-alt-color)',
  				text: 'var(--text-color)',
  				error: 'var(--error-color)',
  				'error-extra': 'var(--error-extra-color)',
  				'colorful-error': 'var(--colorful-error-color)',
  				'colorful-error-extra': 'var(--colorful-error-extra-color)'
  			},
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		fontFamily: {
  			default: [
  				'var(--font-geist-sans)',
  				'system-ui',
  				'sans-serif'
  			],
  			mono: [
  				'var(--font-geist-mono)',
  				'monospace'
  			],
  			vazirmatn: [
  				'Vazirmatn',
  				'sans-serif'
  			],
  			'ubuntu-mono': [
  				'Ubuntu Mono',
  				'monospace'
  			],
  			titillium: [
  				'Titillium Web',
  				'sans-serif'
  			],
  			ubuntu: [
  				'Ubuntu',
  				'sans-serif'
  			],
  			'source-code': [
  				'Source Code Pro',
  				'monospace'
  			],
  			roboto: [
  				'Roboto',
  				'sans-serif'
  			],
  			'roboto-mono': [
  				'Roboto Mono',
  				'monospace'
  			],
  			'overpass-mono': [
  				'Overpass Mono',
  				'monospace'
  			],
  			oxygen: [
  				'Oxygen',
  				'sans-serif'
  			],
  			parkinsans: [
  				'Parkinsans',
  				'sans-serif'
  			],
  			opendyslexic: [
  				'OpenDyslexic',
  				'sans-serif'
  			],
  			'noto-naskh': [
  				'Noto Naskh Arabic',
  				'sans-serif'
  			],
  			nunito: [
  				'Nunito',
  				'sans-serif'
  			],
  			montserrat: [
  				'Montserrat',
  				'sans-serif'
  			],
  			lexend: [
  				'Lexend Deca',
  				'sans-serif'
  			],
  			mononoki: [
  				'Mononoki',
  				'monospace'
  			],
  			lato: [
  				'Lato',
  				'sans-serif'
  			],
  			jetbrains: [
  				'JetBrains Mono',
  				'monospace'
  			],
  			lalezar: [
  				'Lalezar',
  				'sans-serif'
  			],
  			itim: [
  				'Itim',
  				'sans-serif'
  			],
  			'ibm-plex-sans': [
  				'IBM Plex Sans',
  				'sans-serif'
  			],
  			inconsolata: [
  				'Inconsolata',
  				'monospace'
  			],
  			hack: [
  				'Hack',
  				'monospace'
  			],
  			'ibm-plex-mono': [
  				'IBM Plex Mono',
  				'monospace'
  			],
  			geist: [
  				'Geist',
  				'sans-serif'
  			],
  			'geist-mono': [
  				'Geist Mono',
  				'monospace'
  			],
  			'fira-code': [
  				'Fira Code',
  				'monospace'
  			],
  			'coming-soon': [
  				'Coming Soon',
  				'sans-serif'
  			],
  			'commit-mono': [
  				'Commit Mono',
  				'monospace'
  			],
  			comfortaa: [
  				'Comfortaa',
  				'sans-serif'
  			],
  			cascadia: [
  				'Cascadia Mono',
  				'monospace'
  			],
  			atkinson: [
  				'Atkinson Hyperlegible',
  				'sans-serif'
  			],
  			boon: [
  				'Boon',
  				'sans-serif'
  			],
  			'lexend-deca': [
  				'Lexend Deca',
  				'sans-serif'
  			],
  			'berkeley-mono': [
  				'Berkeley Mono',
  				'monospace'
  			]
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  safelist: [
    {
      pattern: /(bg|text|border)-(theme)-(bg|main|sub|error|text)/,
      variants: ['hover', 'focus', 'active'],
    },
  ],
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;