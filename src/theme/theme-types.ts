import {
  Palette as TactilePalette,
  Theme as TactileTheme,
} from './theme.config';

declare module '@mui/material/styles/createPalette' {
  export interface TypeText {
    tertiary: TypeText['primary'];
    inverted: TypeText['primary'];
    error: TypeText['primary'];
    success: TypeText['primary'];
    warning: TypeText['primary'];
  }

  export interface TypeBackground {
    default: string;
    primary: string;
    secondary: string;
    tertiary: string;
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
    versions: TactilePalette['versions'];
    text: TactilePalette['text'];
    border: Palette['primary'];
  }
  export interface PaletteOptions {
    versions: TactilePalette['versions'];
  }
}
