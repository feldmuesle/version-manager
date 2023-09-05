import React, { FC, ReactNode } from 'react';
import { styled } from '@mui/material/styles';
import { Button as MuiButton } from '@mui/material';

export type ButtonProps = {
  label?: string;
  onClick: () => void;
  disabled?: boolean;
  startIcon?: ReactNode;
  color: 'primary' | 'secondary' | 'error';
  variant: 'contained' | 'outlined';
};

const StyledButton = styled(MuiButton, {
  shouldForwardProp: (prop) => prop !== 'iconOnly',
})<{
  variant: ButtonProps['variant'];
  iconOnly: boolean;
}>(({ theme, variant, iconOnly }) => {
  const typography = theme.typography.labelUppercase;

  const defaultStyling = {
    height: 36,
    padding: `0 ${theme.spacer.ms}`,
    ...typography,
    borderRadius: 6,
    '&:hover': {
      backgroundColor:
        variant === 'outlined' ? 'transparent' : theme.palette.primary.main,
    },
  };

  const iconOnlyStyling = iconOnly
    ? {
        padding: 0,
        minWidth: 36,
        '& .MuiButton-startIcon': {
          margin: 0,
        },
      }
    : {};

  return { ...defaultStyling, ...iconOnlyStyling };
});

export const Button: FC<ButtonProps> = ({
  label,
  color,
  variant,
  startIcon,
  ...props
}) => {
  return (
    <StyledButton
      {...props}
      variant={variant}
      color={color}
      startIcon={startIcon}
      iconOnly={!label && !!startIcon}
    >
      {label}
    </StyledButton>
  );
};
