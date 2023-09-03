import React, { ChangeEventHandler, FC } from 'react';
import { styled } from '@mui/material/styles';
import { TextField as MuiTextField } from '@mui/material';

export type TextFieldProps = {
  label: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  disabled?: boolean;
};

const StyledTextField = styled(MuiTextField)(({ theme }) => {
  return {
    '& .MuiInputBase-root': {
      backgroundColor: `${theme.palette.background.secondary}`,
      color: `${theme.palette.text.primary}`,
      border: `1px solid #E2E8F0`,
      borderRadius: 4,

      '&.Mui-focused': {
        backgroundColor: `${theme.palette.background.secondary}`,
        borderColor: `${theme.palette.text.primary}`,
      },

      '&:hover': {
        backgroundColor: `${theme.palette.background.secondary}`,
      },

      '&::before, &::after': {
        borderBottom: 'none !important',
      },

      '& input': {
        height: 38,
        padding: `${theme.spacer.s} ${theme.spacer.ms} 0`,
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

export const TextField: FC<TextFieldProps> = ({ ...props }) => {
  return <StyledTextField {...props} variant='filled' size='small' />;
};
