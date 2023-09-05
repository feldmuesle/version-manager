import React, { ReactNode } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { ThemeProvider } from './theme/ThemeProvider';

/**
 * Renders the provided component wrapped in ThemeProvider
 * @param component the component to render
 * @param options additional render options for @testing-library/react render method
 */
export const renderWithTheme = (
  component: ReactNode,
  options?: RenderOptions
) => render(<ThemeProvider>{component}</ThemeProvider>, options);
