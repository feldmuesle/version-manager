import { Palette as TactilePalette } from './theme.config';

declare module '@mui/material/styles/createPalette' {
  export interface TypeText {
    tertiary: string;
    info: string;
    error: string;
    success: string;
    warning: string;
  }
}

declare module '@mui/material/styles' {
  export interface Palette {
    actions: TactilePalette['actions'];
    text: TactilePalette['text'];
  }
  export interface PaletteOptions {
    actions: TactilePalette['actions'];
  }
}
