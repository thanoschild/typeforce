export const availableFonts = {
    fira_code: 'Fira Code',
    inconsolata: 'Inconsolata',
    jet_brains_mono: 'JetBrains Mono',
    ibm_plex_mono: 'IBM Plex Mono',
    geist_mono: 'Geist Mono',
    cascadia: 'Cascadia',
    commit_mono: 'Commit Mono',
    overpass_mono: 'Overpass Mono',
    mononoki: 'Mononoki',
    source_code: 'Source Code',
    ubuntu_mono: 'Ubuntu Mono',
    roboto_mono: 'Roboto Mono',
    berkeley_mono: 'Berkeley Mono',
    hack: 'Hack',
    lexend: 'Lexend',
    oxygen: 'Oxygen',
    titillium: 'Titillium',
    vazirmatn: 'Vazirmatn',
    parkinsans: 'Parkinsans',
    lexend_deca: 'Lexend Deca',
    itim: 'Itim',
} as const;

export type FontType = keyof typeof availableFonts;

export const defaultFontId = "roboto_mono";

// Helper functions using underscore naming
export const get_all_fonts = () => Object.values(availableFonts);

export const get_font_name = (fontId: FontType) => availableFonts[fontId];