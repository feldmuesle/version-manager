import React, { FC } from 'react';
import { styled } from '@mui/material/styles';
import { Chip as MuiChip } from '@mui/material';

export type ChipProps = {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  color: 'production' | 'test' | 'warning';
};

const StyledChip = styled(MuiChip)(({ theme }) => {
  const typography = theme.typography.labelBold;

  return {
    height: '24px',
    border: 'none',
    ...typography,
  };
});

export const Chip: FC<ChipProps> = ({ ...props }) => {
  return <StyledChip {...props} />;
};
