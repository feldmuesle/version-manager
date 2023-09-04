import React, { ChangeEventHandler, FC, useState } from 'react';
import { styled } from '@mui/material/styles';
import { Button } from '../Button';
import { Chip } from '../Chip';
import { TextField } from '../TextField';
import { Select, SelectOptionProps } from '../Select';
import { Version, VersionOperator, useVersions } from '../../hooks';

export type VersionsControlProps = {};

const OPERATOR_MAP: { [key in VersionOperator]: string | string[] } = {
  equal: '',
  greater_than: '>',
  greater_than_or_equal: '≥',
  less_than: '<',
  less_than_or_equal: '≤',
  between: [']', '['],
};

const OPTIONS: { value: VersionOperator; label: string }[] = [
  { value: 'equal', label: 'equal =' },
  {
    value: 'greater_than',
    label: 'greater than >',
  },
  {
    value: 'greater_than_or_equal',
    label: 'greater then or equal to ≥',
  },
  {
    value: 'less_than',
    label: 'less than <',
  },
  {
    value: 'less_than_or_equal',
    label: 'less than or equal to ≤',
  },
  {
    value: 'between',
    label: 'between',
  },
];

const StyledVersionsControl = styled('div')`
  width: 90%;
  margin: 0 auto;
  background-color: ${({ theme }) => theme.palette.background.default};
  padding: ${({ theme }) => theme.spacer.ms};
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacer.ms};
`;

const StyledHeader = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledButtonGroup = styled('div')`
  display: flex;
  gap: ${({ theme }) => theme.spacer.xs};
`;
const StyledVersionsGroup = styled('div')`
  display: flex;
  gap: ${({ theme }) => theme.spacer.xs};
  flex-wrap: wrap;
`;

const StyledEditSection = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const VersionsControl: FC<VersionsControlProps> = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [operator, setOperator] = useState(OPTIONS[0].value);
  const [versionValue, setVersionValue] = useState('');
  const { versions, submitVersion } = useVersions();

  const handleAddVersionClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const handleSubmitVersion = () => {
    submitVersion(operator, versionValue);
    setIsEditing(false);
    resetForm();
  };

  const resetForm = () => {
    setVersionValue('');
    setOperator(OPTIONS[0].value);
  };

  const handleVersionClick = () => {
    console.log('clicked on version');
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const inputValue = event.target.value;
    setVersionValue(inputValue);
  };

  const handleSelect = (value: SelectOptionProps['value']) => {
    setOperator(value as VersionOperator);
  };

  const renderVersion = (version: Version) => {
    const label = Array.isArray(OPERATOR_MAP[version.operator])
      ? `${OPERATOR_MAP[version.operator][0]} ${version.versions[0]} ${
          OPERATOR_MAP[version.operator][1]
        }`
      : OPERATOR_MAP[version.operator].length
      ? `${OPERATOR_MAP[version.operator]} ${version.versions[0]}`
      : version.versions[0];
    return (
      <Chip label={label} type='production' onClick={handleVersionClick} />
    );
  };

  return (
    <StyledVersionsControl>
      <StyledHeader>
        <span>Versions</span>
        {isEditing ? (
          <StyledButtonGroup>
            <Button
              label='add'
              onClick={handleSubmitVersion}
              color='primary'
              variant='outlined'
            />
            <Button
              label='cancel'
              onClick={handleCancelClick}
              color='secondary'
              variant='outlined'
            />
          </StyledButtonGroup>
        ) : (
          <Button
            label='add version'
            onClick={handleAddVersionClick}
            color='primary'
            variant='outlined'
          />
        )}
      </StyledHeader>
      <StyledVersionsGroup>
        {versions.length > 0 && versions.map(renderVersion)}
      </StyledVersionsGroup>
      {isEditing && (
        <StyledEditSection>
          <Select
            onChange={handleSelect}
            label='Operator'
            options={OPTIONS}
            selectedValue={operator}
          />
          <TextField
            onChange={handleChange}
            label='Version'
            value={versionValue}
          />
        </StyledEditSection>
      )}
    </StyledVersionsControl>
  );
};
