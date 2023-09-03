import React, { FC } from 'react';
import { styled } from '@mui/material/styles';
import { Chip as MuiChip } from '@mui/material';

export type ChipProps = {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  type: 'production' | 'test' | 'warning';
};

const StyledChip = styled(MuiChip, {
  shouldForwardProp: (prop) => prop !== 'type',
})<{
  type: ChipProps['type'];
}>(({ theme, type }) => {
  const chipTheme = theme.palette.versions[type];
  const typography = theme.typography.labelUppercase;

  return {
    backgroundColor: chipTheme.default,
    color: chipTheme.text,
    height: '24px',
    border: 'none',
    ...typography,

    '&:hover': {
      backgroundColor: chipTheme.hover,
      color: chipTheme.hoverText,
    },
  };
});

export const Chip: FC<ChipProps> = ({ ...props }) => {
  return <StyledChip {...props} />;
};
