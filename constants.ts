import { Palette, ThemeType } from './types';

// Palette definitions for each theme
export const THEME_PALETTES: Record<ThemeType, Palette[]> = {
  [ThemeType.CYBERPUNK]: [
    // EVA-01: Purple / Green / Orange
    { bg: '#2e1065', text: '#a3e635', accent: '#f97316', border: '#171717' }, 
    // NERV: Black / Red / White
    { bg: '#09090b', text: '#ef4444', accent: '#ffffff', border: '#ef4444' }, 
    // REI: White / Blue / Black
    { bg: '#f8fafc', text: '#2563eb', accent: '#1e293b', border: '#cbd5e1' },
    // UNIT-02: Red / Orange / Yellow
    { bg: '#7f1d1d', text: '#fbbf24', accent: '#f97316', border: '#fca5a5' },
    // MARK.06: Navy / Gold / Grey
    { bg: '#172554', text: '#facc15', accent: '#94a3b8', border: '#e2e8f0' },
  ],
  [ThemeType.MINIMALIST]: [
    { bg: '#ffffff', text: '#171717', accent: '#d4d4d4' }, // Pure White
    { bg: '#f5f5f4', text: '#44403c', accent: '#a8a29e' }, // Stone Warm
    { bg: '#eff6ff', text: '#1e3a8a', accent: '#93c5fd' }, // Soft Blue
    { bg: '#f0fdf4', text: '#14532d', accent: '#86efac' }, // Sage Green
    { bg: '#fff1f2', text: '#be123c', accent: '#fda4af' }, // Soft Blush
  ],
  [ThemeType.VINTAGE]: [
    // Matisse: Cream / Blue / Rust
    { bg: '#ffedd5', text: '#1d4ed8', accent: '#c2410c' }, 
    // Cutout: Sage / Pink / Dark Red
    { bg: '#e2e8f0', text: '#be123c', accent: '#15803d' }, 
    // Abstract: Ochre / Black / Teal
    { bg: '#fef3c7', text: '#111827', accent: '#0f766e' }, 
    // Leaf: Light Green / Yellow / Navy
    { bg: '#dcfce7', text: '#1e40af', accent: '#facc15' },
    // Night: Dark Blue / White / Orange
    { bg: '#1e3a8a', text: '#f8fafc', accent: '#fb923c' },
  ],
};

// Map position selection to Tailwind object-position classes
export const POSITION_CLASSES: Record<string, string> = {
  'left-top': 'object-left-top',
  'left-center': 'object-left',
  'left-bottom': 'object-left-bottom',
  'center-top': 'object-top',
  'center-center': 'object-center',
  'center-bottom': 'object-bottom',
  'right-top': 'object-right-top',
  'right-center': 'object-right',
  'right-bottom': 'object-right-bottom',
};

// Font mapping based on theme and language (conceptually)
export const FONTS = {
  cyberpunk: {
    en: 'font-["Press_Start_2P"]',
    title: 'font-["Anton"]', // Switch title to Impact-style for EVA look
    cn: 'font-["ZCOOL_QingKe_HuangYou"]',
  },
  minimalist: {
    main: 'font-["Noto_Sans_SC"]',
  },
  vintage: {
    title: 'font-["Rubik_Wet_Paint"]',
    body: 'font-["Anton"]',
    artistic: 'font-["Ma_Shan_Zheng"]', // Artistic Calligraphy font
  },
};