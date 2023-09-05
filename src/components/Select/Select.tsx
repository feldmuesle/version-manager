import React from 'react';
import { styled } from '@mui/material/styles';
import { MenuItem } from '@mui/material';
import { StyledTextField } from '../TextField';

export interface SelectOptionProps {
  value: string;
  label: string;
}

export interface SelectOptionItemProps extends SelectOptionProps {
  selected?: boolean;
}

export interface SelectProps<T extends SelectOptionProps = SelectOptionProps> {
  name: string;
  label: string;
  onChange: (value: SelectOptionProps['value']) => void;
  options: T[];
  disabled?: boolean;
  selectedValue?: string;
}

const StyledSelect = styled(StyledTextField)(({ theme }) => {
  return {
    position: 'relative',
    '& .MuiSelect-select': {
      paddingLeft: theme.spacer.ms,
      paddingRight: theme.spacer.ms,

      '&.MuiSelect-filled:focus': {
        backgroundColor: `${theme.palette.background.tertiary}`,
      },
    },
  };
});

const StyledOption = styled(MenuItem)(({ theme: { palette, spacer } }) => {
  const backgroundColorEmphasized = {
    backgroundColor: palette.background.secondary,
  };

  return {
    color: palette.text.primary,
    backgroundColor: palette.background.default,

    ':hover': { ...backgroundColorEmphasized, color: palette.text.inverted },
    ':focus-visible': backgroundColorEmphasized,

    '&.Mui-selected': {
      backgroundColor: palette.background.primary,
      color: palette.text.inverted,

      '&:hover': backgroundColorEmphasized,
      '&:focus-visible': backgroundColorEmphasized,
    },
  };
});

export const Select = <T extends SelectOptionProps = SelectOptionProps>({
  selectedValue = '',
  disabled,
  onChange,
  options,
  ...props
}: SelectProps<T>) => {
  const handleSelect = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const selectedVal = event.target.value;
    onChange(selectedVal);
  };

  return (
    <StyledSelect
      {...props}
      select
      value={selectedValue}
      onChange={handleSelect}
      variant='filled'
      size='small'
      SelectProps={{
        MenuProps: {
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'center',
          },
        },
      }}
    >
      {options.map(({ value, label }) => {
        const isSelected = selectedValue === value;
        return (
          <StyledOption key={value} selected={isSelected} value={value}>
            {label}
          </StyledOption>
        );
      })}
    </StyledSelect>
  );
};
