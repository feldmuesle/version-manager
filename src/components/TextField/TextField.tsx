import React, { ChangeEventHandler, FC, ReactNode } from 'react';
import { styled } from '@mui/material/styles';
import {
  InputBaseComponentProps,
  TextField as MuiTextField,
} from '@mui/material';

export type TextFieldProps = {
  name: string;
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
    flex: '1 0 0',
    maxWidth: '360px',
    '& .MuiInputBase-root': {
      height: '54px',
      backgroundColor: `${theme.palette.background.tertiary}`,
      color: `${theme.palette.text.primary}`,
      border: `1px solid ${
        error ? theme.palette.text.error : theme.palette.border.main
      }`,
      borderRadius: 4,

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
        borderRadius: 'inherit',
        backgroundColor: 'transparent',
        padding: `${theme.spacer.lg} ${theme.spacer.ms} 5px`,
        '&:focus': {
          backgroundColor: `${theme.palette.background.tertiary}`,
        },
      },
    },
    '& .MuiFormLabel-root': {
      ...theme.typography.fieldLabel,
      color: `${theme.palette.text[error ? 'error' : 'secondary']}`,
      lineHeight: theme.spacer.xl,

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
