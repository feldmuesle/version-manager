import React, { FC } from 'react';
import { styled } from '@mui/material/styles';
import { Button as MuiButton } from '@mui/material';

export type ButtonProps = {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  displayType: 'primary' | 'secondary';
};

const StyledButton = styled(MuiButton, {
  shouldForwardProp: (prop) => prop !== 'displayType',
})<{
  displayType: ButtonProps['displayType'];
}>(({ theme, displayType }) => {
  const buttonTheme = theme.palette.actions[displayType];
  const typography = theme.typography.labelUppercase;

  return {
    height: 36,
    padding: `0 ${theme.spacer.ms}`,
    ...typography,
    color: buttonTheme.text,
    backgroundColor: 'transparent',
    borderRadius: 6,
    borderColor: buttonTheme.outline,
    '&:hover': {
      backgroundColor: buttonTheme.hover,
      borderColor: buttonTheme.outline,
    },
    '&:active': {
      backgroundColor: buttonTheme.active,
      borderColor: buttonTheme.outline,
    },
    '&.Mui-disabled': {
      color: buttonTheme.outline,
      borderColor: buttonTheme.outline,
    },
  };
});

export const Button: FC<ButtonProps> = ({ label, displayType, ...props }) => {
  return (
    <StyledButton {...props} variant='outlined' displayType={displayType}>
      {label}
    </StyledButton>
  );
};
