import { 
  Fira_Code, 
  Inconsolata, 
  JetBrains_Mono, 
  Roboto, 
  Roboto_Mono,
  Ubuntu,
  Ubuntu_Mono,
  Titillium_Web,
  Oxygen,
  Nunito,
  Montserrat,
  Lato,
  Comfortaa,
  Coming_Soon,
  Itim,
  Lalezar,
  Lexend_Deca,
  Noto_Naskh_Arabic,
  Atkinson_Hyperlegible,
} from 'next/font/google';

// Configure each font with specific settings
export const firaCode = Fira_Code({
  variable: '--font-fira-code',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400'],
});

export const inconsolata = Inconsolata({
  variable: '--font-inconsolata',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400'],
});

export const jetbrains = JetBrains_Mono({
  variable: '--font-jetbrains',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400'],
});

export const roboto = Roboto({
  variable: '--font-roboto',
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
});

export const robotoMono = Roboto_Mono({
  variable: '--font-roboto-mono',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400'],
});

export const ubuntu = Ubuntu({
  variable: '--font-ubuntu',
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
});

export const ubuntuMono = Ubuntu_Mono({
  variable: '--font-ubuntu-mono',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400'],
});

export const titillium = Titillium_Web({
  variable: '--font-titillium',
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
});

export const oxygen = Oxygen({
  variable: '--font-oxygen',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400'],
});

export const nunito = Nunito({
  variable: '--font-nunito',
  subsets: ['latin'],
  weight: ['700'],
  display: 'swap',
});

export const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400'],
});

export const lato = Lato({
  variable: '--font-lato',
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
});

export const comfortaa = Comfortaa({
  variable: '--font-comfortaa',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400'],
});

export const comingSoon = Coming_Soon({
  variable: '--font-coming-soon',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400'],
});

export const itim = Itim({
  variable: '--font-itim',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400'],
});

export const lalezar = Lalezar({
  variable: '--font-lalezar',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400'],
});

export const lexend = Lexend_Deca({
  variable: '--font-lexend',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400'],
});

export const notoNaskh = Noto_Naskh_Arabic({
  variable: '--font-noto-naskh',
  subsets: ['arabic'],
  display: 'swap',
  weight: ['400'],
});

export const atkinson = Atkinson_Hyperlegible({
  variable: '--font-atkinson',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400'],
});

// Map of all available fonts
export const fonts: Record<string, any> = {
  'fira-code': firaCode,
  'inconsolata': inconsolata,
  'jetbrains': jetbrains,
  'roboto': roboto,
  'roboto-mono': robotoMono,
  'ubuntu': ubuntu,
  'ubuntu-mono': ubuntuMono,
  'titillium': titillium,
  'oxygen': oxygen,
  'nunito': nunito,
  'montserrat': montserrat,
  'lato': lato,
  'comfortaa': comfortaa,
  'coming-soon': comingSoon,
  'itim': itim,
  'lalezar': lalezar,
  'lexend': lexend,
  'noto-naskh': notoNaskh,
  'atkinson': atkinson,
};