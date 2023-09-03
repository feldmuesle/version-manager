import {
  Palette as TactilePalette,
  Theme as TactileTheme,
} from './theme.config';

declare module '@mui/material/styles/createPalette' {
  export interface TypeText {
    tertiary: string;
    info: string;
    error: string;
    success: string;
    warning: string;
  }

  export interface TypeBackground {
    default: string;
    primary: string;
    secondary: string;
  }
}

declare module '@mui/material/styles' {
  export interface TypographyVariants {
    sectionTitle: React.CSSProperties;
    labelUppercase: React.CSSProperties;
  }
  export interface Theme {
    spacer: TactileTheme['spacer'];
  }
  export interface Palette {
    actions: TactilePalette['actions'];
    versions: TactilePalette['versions'];
    text: TactilePalette['text'];
  }
  export interface PaletteOptions {
    actions: TactilePalette['actions'];
    versions: TactilePalette['versions'];
  }
}
