import { createTheme } from '@mui/material';

const THEME = {
  typography: {
    fontFamily: ['Inter', 'Quicksand', 'sans-serif'].join(','),
    htmlFontSize: 16,
    pageTitle: {
      fontSize: '1.25rem', // 20px
      fontWeight: 600,
      lineHeight: '120%', // 24px
    },
    sectionTitle: {
      fontSize: '1rem', // 16px
      fontWeight: 600,
      lineHeight: '162.5%', // 26px
    },
    labelUppercase: {
      fontSize: '0.875rem', // 14px
      fontWeight: 600,
      lineHeight: '171.429%', // 24px
      textTransform: 'uppercase',
    },
    labelBold: {
      fontSize: '0.75rem', // 12px
      fontWeight: 700,
      lineHeight: '150%', // 18px
    },
    fieldLabel: {
      fontSize: '1rem', // 16px
      fontWeight: 400,
      lineHeight: '150%', // 24px
      letterSpacing: '0.4px',
    },
  },
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiButton: {
      styleOverrides: {
        outlinedPrimary: {
          borderColor: '#C7D2FE',
        },
        outlinedSecondary: {
          borderColor: '#E2E8F0',
        },
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
};

const PALETTE = {
  background: {
    default: '#FFFFFF',
    primary: '#334155',
    secondary: '#E2E8F0', // #212831
    tertiary: '#F8FAFC',
  },
  text: {
    primary: '#64748B',
    secondary: '#334155',
    tertiary: '#6B7280',
    disabled: '#9CA3AF',
    inverted: '#F8FAFC',
    error: '#EF4444',
  },
  primary: {
    main: '#4F46E5',
    dark: '#64748B',
  },
  secondary: {
    main: '#64748B',
  },
  error: {
    main: '#EF4444',
  },
  border: {
    main: '#E2E8F0',
  },
  production: {
    main: '#334155',
    dark: '#64748B',
    contrastText: '#F8FAFC',
  },
  test: {
    main: '#E2E8F0',
    dark: '#CBD5E1',
    contrastText: '#64748B',
  },
};

export type Palette = typeof PALETTE;

export type Theme = typeof THEME & {
  palette: Palette;
};

export const defaultTheme = createTheme({ ...THEME, palette: { ...PALETTE } });
