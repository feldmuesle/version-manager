import React, { ChangeEventHandler, FC, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import {
  Version,
  VersionOperator,
  VersionType,
  useVersions,
} from '../../hooks';
import { Styled } from './Styles';
import { Button } from '../Button';
import { Chip } from '../Chip';
import { TextField } from '../TextField';
import { Select, SelectOptionProps } from '../Select';

const OPERATOR_MAP: { [key in VersionOperator]: string } = {
  equal: '',
  greater_than: '>',
  greater_than_or_equal: '≥',
  less_than: '<',
  less_than_or_equal: '≤',
};

export const OPTIONS: { value: VersionOperator; label: string }[] = [
  { value: 'equal', label: 'equal =' },
  {
    value: 'greater_than',
    label: 'greater than >',
  },
  {
    value: 'greater_than_or_equal',
    label: 'greater than or equal to ≥',
  },
  {
    value: 'less_than',
    label: 'less than <',
  },
  {
    value: 'less_than_or_equal',
    label: 'less than or equal to ≤',
  },
];

export const VersionsControl: FC = () => {
  const [isEditSectionVisible, setIsEditSectionVisible] = useState(false);
  const [activeVersionType, setActiveVersionType] =
    useState<VersionType>('production');
  const [updateVersionId, setUpdateVersionId] = useState<string | undefined>();
  const [operator, setOperator] = useState(OPTIONS[0].value);
  const [versionValue, setVersionValue] = useState('');
  const [hasInputError, setHasInputError] = useState(false);
  const {
    versions: prodVersions,
    submitVersion: submitProdVersion,
    updateVersion: updateProdVersion,
    deleteVersion: deleteProdVersion,
  } = useVersions('production');
  const {
    versions: testVersions,
    submitVersion: submitTestVersion,
    updateVersion: updateTestVersion,
    deleteVersion: deleteTestVersion,
  } = useVersions('test');

  const handleAddVersionClick = (type: VersionType) => {
    setActiveVersionType(type);
    setIsEditSectionVisible(true);
  };

  const handleCancelClick = () => {
    setIsEditSectionVisible(false);
    resetForm();
  };

  const handleSubmitVersion = () => {
    const isValid = validateInput(versionValue);

    if (isValid) {
      const submitVersion =
        activeVersionType === 'production'
          ? submitProdVersion
          : submitTestVersion;
      submitVersion(operator, versionValue);

      setIsEditSectionVisible(false);
      resetForm();
    } else {
      setHasInputError(true);
    }
  };

  const handleUpdateVersion = () => {
    const isValid = validateInput(versionValue);
    if (isValid && updateVersionId) {
      const updateVersion =
        activeVersionType === 'production'
          ? updateProdVersion
          : updateTestVersion;
      updateVersion({
        operator,
        value: versionValue,
        id: updateVersionId,
      });
      setIsEditSectionVisible(false);
      resetForm();
    } else {
      setHasInputError(true);
    }
  };

  const handleDeleteVersion = (updateVersionId: string) => {
    const deleteVersion =
      activeVersionType === 'production'
        ? deleteProdVersion
        : deleteTestVersion;
    deleteVersion(updateVersionId);
    setIsEditSectionVisible(false);
    resetForm();
  };

  const resetForm = () => {
    setVersionValue('');
    setOperator(OPTIONS[0].value);
    setHasInputError(false);
    setUpdateVersionId(undefined);
  };

  const validateInput = (valueToTest: string) => {
    const pattern = /^\d+\.\d+\.\d+$/;
    return pattern.test(valueToTest);
  };

  const handleVersionClick = (versionId: string) => {
    const versionToEdit =
      prodVersions.find((version) => version.id === versionId) ??
      testVersions.find((version) => version.id === versionId);
    if (versionToEdit) {
      setUpdateVersionId(versionId);
      setVersionValue(versionToEdit.value);
      setOperator(versionToEdit.operator);
      setIsEditSectionVisible(true);
    }
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const inputValue = event.target.value;
    setVersionValue(inputValue);
  };

  const handleSelect = (value: SelectOptionProps['value']) => {
    setOperator(value as VersionOperator);
  };

  const renderVersion = (version: Version) => {
    const label = OPERATOR_MAP[version.operator].length
      ? `${OPERATOR_MAP[version.operator]} ${version.value}`
      : version.value;
    const color = version.isOverlapping ? 'warning' : version.type;

    return (
      <Chip
        key={version.id}
        label={label}
        color={color}
        onClick={() => handleVersionClick(version.id)}
      />
    );
  };

  return (
    <Styled.Wrapper>
      <Styled.Header>
        <Styled.Heading>Versions</Styled.Heading>
        {isEditSectionVisible ? (
          <Styled.ButtonGroup>
            <Button
              label={updateVersionId ? 'save' : 'add'}
              onClick={
                updateVersionId ? handleUpdateVersion : handleSubmitVersion
              }
              color='primary'
              variant='outlined'
            />
            <Button
              label='cancel'
              onClick={handleCancelClick}
              color='secondary'
              variant='outlined'
            />
          </Styled.ButtonGroup>
        ) : (
          <Styled.ButtonGroup>
            <Button
              label='add version'
              onClick={() => handleAddVersionClick('production')}
              color='primary'
              variant='outlined'
            />
            <Button
              label='add testversion'
              onClick={() => handleAddVersionClick('test')}
              color='primary'
              variant='outlined'
            />
          </Styled.ButtonGroup>
        )}
      </Styled.Header>
      <Styled.VersionsSection>
        <Styled.SubHeading>Production</Styled.SubHeading>
        {prodVersions.length > 0 && prodVersions.map(renderVersion)}
      </Styled.VersionsSection>
      <Styled.VersionsSection>
        <Styled.SubHeading>Test</Styled.SubHeading>
        {testVersions.length > 0 && testVersions.map(renderVersion)}
      </Styled.VersionsSection>
      {isEditSectionVisible && (
        <div>
          <Styled.EditSection>
            <Select
              name='operator'
              onChange={handleSelect}
              label='Operator'
              options={OPTIONS}
              selectedValue={operator}
            />
            <TextField
              name='version'
              onChange={handleChange}
              label={
                activeVersionType === 'production' ? 'Version' : 'Testversion'
              }
              value={versionValue}
              error={hasInputError}
              inputProps={{
                inputMode: 'numeric',
              }}
            />
            {updateVersionId && (
              <Button
                onClick={() => handleDeleteVersion(updateVersionId)}
                startIcon={<CloseIcon />}
                variant='outlined'
                color='error'
              />
            )}
          </Styled.EditSection>
          {hasInputError && (
            <Styled.ErrorSection>
              Version must be formatted as [num].[num].[num]
            </Styled.ErrorSection>
          )}
        </div>
      )}
    </Styled.Wrapper>
  );
};
