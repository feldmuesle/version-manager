import React, { FC } from 'react';
import { styled } from '@mui/material/styles';
import { Button as MuiButton } from '@mui/material';

export type ButtonProps = {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  color: 'primary' | 'secondary';
  variant: 'contained' | 'outlined';
};

const StyledButton = styled(MuiButton, {
  shouldForwardProp: (prop) => prop !== 'color',
})<{
  color: ButtonProps['color'];
  variant: ButtonProps['variant'];
}>(({ theme, color, variant }) => {
  const buttonTheme = theme.palette.actions[color];
  const typography = theme.typography.labelUppercase;

  const defaultStyling = {
    height: 36,
    padding: `0 ${theme.spacer.ms}`,
    ...typography,
    borderRadius: 6,
  };

  if (variant === 'outlined') {
    return {
      ...defaultStyling,
      backgroundColor: buttonTheme.contrast,
      color: buttonTheme.default,
      border: `1px solid ${buttonTheme.outline}`,
      '&:hover': {
        backgroundColor: buttonTheme.hover,
        borderColor: buttonTheme.outline,
      },
      '&:active': {
        backgroundColor: buttonTheme.active,
        borderColor: buttonTheme.outline,
      },
      '&.Mui-disabled': {
        color: buttonTheme.disabled,
        borderColor: buttonTheme.disabled,
      },
    };
  }

  return {
    ...defaultStyling,
    backgroundColor: buttonTheme.default,
    color: buttonTheme.contrast,
    border: 'none',
    boxShadow: '0px 1px 3px 0px rgba(9, 30, 66, 0.12)',
    '&:hover': {
      backgroundColor: buttonTheme.hover,
      boxShadow: '0px 1px 3px 0px rgba(9, 30, 66, 0.12)',
    },
    '&:active': {
      backgroundColor: buttonTheme.active,
    },
    '&.Mui-disabled': {
      color: buttonTheme.disabledText,
      backgroundColor: buttonTheme.disabled,
    },
  };
});

export const Button: FC<ButtonProps> = ({
  label,
  color,
  variant,
  ...props
}) => {
  return (
    <StyledButton {...props} variant={variant} color={color}>
      {label}
    </StyledButton>
  );
};
