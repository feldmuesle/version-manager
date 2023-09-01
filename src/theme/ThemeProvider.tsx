import React, { FC, PropsWithChildren, useMemo } from 'react';
import {
  createTheme,
  StyledEngineProvider,
  ThemeProvider as MuiThemeProvider,
} from '@mui/material/styles';
import { Theme, defaultTheme } from './theme.config';

export type ThemeProviderProps<T extends Theme> = {
  theme?: T;
};

export const ThemeProvider: FC<PropsWithChildren<ThemeProviderProps<any>>> = ({
  theme = defaultTheme,
  children,
}) => {
  const newTheme = useMemo(() => createTheme(theme), [theme]);

  return (
    <StyledEngineProvider injectFirst>
      <MuiThemeProvider theme={newTheme}>{children}</MuiThemeProvider>
    </StyledEngineProvider>
  );
};
