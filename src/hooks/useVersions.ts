import React, { useState } from 'react';

export type VersionOperator =
  | 'equal'
  | 'greater_than'
  | 'greater_than_or_equal'
  | 'less_than'
  | 'less_than_or_equal'
  | 'between';

export type Version = {
  operator: VersionOperator;
  versions: [string] | [string, string];
};

export const useVersions = () => {
  const [versions, setVersions] = useState<Version[]>([]);

  const handleSubmitVersion = (
    operator: VersionOperator,
    value1: string,
    value2?: string
  ) => {
    const newVersion: Version = {
      operator,
      versions: value2 ? [value1, value2] : [value1],
    };
    setVersions((prevVersions) => [...prevVersions, newVersion]);
  };

  return {
    submitVersion: handleSubmitVersion,
    versions,
  };
};
