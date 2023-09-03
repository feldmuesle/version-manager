import React, { ChangeEventHandler, FC, ReactNode } from 'react';
import { styled } from '@mui/material/styles';
import { TextField as MuiTextField } from '@mui/material';

export type TextFieldProps = {
  label: string;
  value?: string;
  defaultValue?: string | number;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  disabled?: boolean;
  select?: boolean;
  children?: ReactNode;
};

export const StyledTextField = styled(MuiTextField)(({ theme }) => {
  return {
    '& .MuiInputBase-root': {
      backgroundColor: `${theme.palette.background.tertiary}`,
      color: `${theme.palette.text.primary}`,
      border: `1px solid #E2E8F0`,
      borderRadius: 4,
      width: '362px',

      '&.Mui-focused': {
        backgroundColor: `${theme.palette.background.tertiary}`,
        borderColor: `${theme.palette.text.primary}`,
      },

      '&:hover': {
        backgroundColor: `${theme.palette.background.tertiary}`,
      },

      '&::before, &::after': {
        borderBottom: 'none !important',
      },

      '& input': {
        height: 38,
        padding: `${theme.spacer.s} ${theme.spacer.ms}`,
      },
    },
    '& .MuiFormLabel-root': {
      color: `${theme.palette.text.secondary}`,

      '&.Mui-focused': {
        color: `${theme.palette.text.secondary}`,
      },
    },
  };
});

export const TextField: FC<TextFieldProps> = ({ children, ...props }) => {
  return (
    <StyledTextField {...props} variant='filled' size='small'>
      {children}
    </StyledTextField>
  );
};
