import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export type VersionOperator =
  | 'equal'
  | 'greater_than'
  | 'greater_than_or_equal'
  | 'less_than'
  | 'less_than_or_equal';

export type Version = {
  operator: VersionOperator;
  value: string;
  id: string;
};

export const useVersions = () => {
  const [versions, setVersions] = useState<Version[]>([]);

  const sortVersions = (a: Version, b: Version) => {
    return a.value.localeCompare(b.value);
  };

  const handleSubmitVersion = (operator: VersionOperator, value: string) => {
    const newVersion: Version = {
      operator,
      value,
      id: uuidv4(),
    };

    setVersions((prevVersions) =>
      [...prevVersions, newVersion].sort(sortVersions)
    );
  };

  const handleUpdateVersion = (version: Version) => {
    setVersions((prevVersions) => {
      return prevVersions.map((v) => (v.id === version.id ? version : v));
    });
  };

  const handleDeleteVersion = (id: string) => {
    setVersions((prevVersions) =>
      versions.filter((version) => version.id !== id).sort(sortVersions)
    );
  };

  return {
    submitVersion: handleSubmitVersion,
    updateVersion: handleUpdateVersion,
    deleteVersion: handleDeleteVersion,
    versions,
  };
};
