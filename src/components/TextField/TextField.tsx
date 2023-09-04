import React, { ChangeEventHandler, FC, ReactNode } from 'react';
import { styled } from '@mui/material/styles';
import {
  InputBaseComponentProps,
  TextField as MuiTextField,
} from '@mui/material';

export type TextFieldProps = {
  label: string;
  value?: string;
  defaultValue?: string | number;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  disabled?: boolean;
  select?: boolean;
  children?: ReactNode;
  inputProps?: InputBaseComponentProps;
  error?: boolean;
  helperText?: string;
};

export const StyledTextField = styled(MuiTextField)(({ theme, error }) => {
  return {
    '& .MuiInputBase-root': {
      backgroundColor: `${theme.palette.background.tertiary}`,
      color: `${theme.palette.text.primary}`,
      border: `1px solid ${error ? theme.palette.text.error : '#E2E8F0'}`,
      borderRadius: 4,
      width: '362px',

      '&.Mui-focused': {
        backgroundColor: `${theme.palette.background.tertiary}`,
        borderColor: `${theme.palette.text[error ? 'error' : 'primary']}`,
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
        borderRadius: 'inherit',
      },
    },
    '& .MuiFormLabel-root': {
      color: `${theme.palette.text[error ? 'error' : 'secondary']}`,

      '&.Mui-focused': {
        color: `${theme.palette.text[error ? 'error' : 'secondary']}`,
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
