import { Theme as TactileTheme } from './theme.config';

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
    pageTitle: React.CSSProperties;
    sectionTitle: React.CSSProperties;
    labelUppercase: React.CSSProperties;
    labelBold: React.CSSProperties;
    fieldLabel: React.CSSProperties;
  }
  export interface Theme {
    spacer: TactileTheme['spacer'];
  }
  export interface Palette {
    border: Palette['primary'];
    production: Palette['primary'];
    test: Palette['primary'];
  }
}

declare module '@mui/material' {
  interface ChipPropsColorOverrides {
    production: true;
    test: true;
  }
}
