import { Breakpoints, createTheme } from '@mui/material';

const THEME = {
  typography: {
    fontFamily: `'proxima-nova', sans-serif`,
    htmlFontSize: 16,
    sectionTitle: {
      fontSize: '1rem', // 16px
      fontWeight: 600,
      lineHeight: '1.25rem', // 20px
    },
    labelUppercase: {
      fontSize: '0.75rem', // 12px
      fontWeight: 700,
      lineHeight: '1.125rem', // 18px
      textTransform: 'uppercase',
    },
  },
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
  },
  spacing: 4,
  spacer: {
    xs: '0.25rem', // 4px
    s: '0.5rem', // 8px
    sm: '0.75rem', // 12px
    ms: '1rem', // 16px
    m: '1.25rem', // 20px
    lg: '1.5rem', // 24px
    xl: '2rem', // 32px
  },
  breakpoints: {
    values: {
      xs: 425,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
};

const PALETTE = {
  background: {
    default: '#FFFFFF',
    primary: '#111827',
    secondary: '#64748B',
    tertiary: '#F8FAFC',
    // warning: '#FF9800',
  },
  text: {
    primary: '#334155',
    secondary: '#64748B',
    tertiary: '#6B7280',
    disabled: '#9CA3AF',
    inverted: '#FFFFFF',
    error: '#B91C1C',
    success: '#065F46',
    warning: '#9A3412',
  },
  actions: {
    primary: {
      contrast: '#FFFFFF',
      default: '#4F46E5',
      hover: '#C7D2FE',
      active: '#4F46E5',
      outline: '#C7D2FE',
      disabled: '#E2E8F0',
      disabledText: '#CBD5E1',
    },
    secondary: {
      contrast: '#FFFFFF',
      default: '#64748B',
      hover: '#E2E8F0',
      active: '#64748B',
      outline: '#E2E8F0',
      disabled: '#E2E8F0',
      disabledText: '#CBD5E1',
    },
  },
  versions: {
    production: {
      default: '#334155',
      text: '#F8FAFC',
      hover: '#64748B',
      hoverText: '#F8FAFC',
    },
    test: {
      default: '#64748B',
      text: '#E2E8F0',
      hover: '#64748B',
      hoverText: '#CBD5E1',
    },
    warning: {
      default: '#F59E0B',
      text: '#F8FAFC',
      hover: '#DB8804',
      hoverText: '#F8FAFC',
    },
  },
};

export type Palette = typeof PALETTE;

export type Theme = typeof THEME & {
  palette: Palette;
  breakpoints: Breakpoints;
};

export const defaultTheme = createTheme({ ...THEME, palette: { ...PALETTE } });
