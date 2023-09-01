import { Breakpoints, createTheme } from '@mui/material';

const THEME = {
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
    warning: '#FF9800',
  },
  text: {
    primary: '#111827',
    secondary: '#374151',
    tertiary: '#6B7280',
    disabled: '#9CA3AF',
    info: '#075985',
    error: '#B91C1C',
    success: '#065F46',
    warning: '#9A3412',
  },
  actions: {
    primary: {
      text: '#FFFFFF',
      default: '#4F46E5',
      hover: '#7986CB',
      active: '#22327C',
      disabled: '#DDE2EE',
    },
    secondary: {
      text: '#374151',
      default: '#F3F4F6',
      hover: '#E4E7EC',
      active: '#D1D5DB',
      disabled: '#F9FAFB',
    },
    tertiary: {
      text: '#374151',
      default: 'transparent',
      hover: '#F9FAFB',
      active: '#F3F4F6',
      disabled: 'transparent',
    },
  },
};

export type Palette = typeof PALETTE;

export type Theme = typeof THEME & {
  palette: Palette;
  breakpoints: Breakpoints;
};

export const defaultTheme = createTheme({ ...THEME, palette: { ...PALETTE } });
