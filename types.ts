export enum ThemeType {
  CYBERPUNK = 'CYBERPUNK',
  MINIMALIST = 'MINIMALIST',
  VINTAGE = 'VINTAGE',
}

export enum DecorationType {
  NONE = 'NONE',
  ROCKET = 'ROCKET',
  CAT = 'CAT',
  STAR = 'STAR',
  HEART = 'HEART',
  DOG = 'DOG',
}

export type PositionX = 'left' | 'center' | 'right';
export type PositionY = 'top' | 'center' | 'bottom';

export interface ImagePosition {
  x: PositionX;
  y: PositionY;
}

export interface Palette {
  bg: string;
  text: string;
  accent: string;
  border?: string; // Optional border color mainly for cyberpunk
}

export interface AppState {
  theme: ThemeType;
  paletteIndex: number;
  image: string | null;
  imagePosition: ImagePosition;
  category: string;
  description: string;
  decoration: DecorationType;
  isExporting: boolean; // Used to freeze animations during capture
}