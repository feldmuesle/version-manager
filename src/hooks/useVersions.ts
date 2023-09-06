import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export type VersionOperator =
  | 'equal'
  | 'greater_than'
  | 'greater_than_or_equal'
  | 'less_than'
  | 'less_than_or_equal';

export type VersionType = 'test' | 'production';

export type Version = {
  operator: VersionOperator;
  value: string;
  id: string;
  type: VersionType;
  isOverlapping?: boolean;
};

export const useVersions = (type: VersionType) => {
  const [versions, setVersions] = useState<Version[]>([]);

  const handleSubmitVersion = (operator: VersionOperator, value: string) => {
    const newVersion: Version = {
      operator,
      value,
      type,
      id: uuidv4(),
    };

    setVersions((prevVersions) => {
      const sortedVersions = [...prevVersions, newVersion].sort(sortVersions);
      return setIsOverlapping(sortedVersions);
    });
  };

  const handleUpdateVersion = (version: Omit<Version, 'type'>) => {
    setVersions((prevVersions) => {
      const updatedVersions = prevVersions
        .map((v) => (v.id === version.id ? { ...version, type } : v))
        .sort(sortVersions);
      return setIsOverlapping(updatedVersions);
    });
  };

  const handleDeleteVersion = (id: string) => {
    setVersions((prevVersions) => {
      const remainingVersions = prevVersions
        .filter((version) => version.id !== id)
        .sort(sortVersions);

      return remainingVersions.length > 0
        ? setIsOverlapping(remainingVersions)
        : remainingVersions;
    });
  };

  return {
    submitVersion: handleSubmitVersion,
    updateVersion: handleUpdateVersion,
    deleteVersion: handleDeleteVersion,
    versions,
  };
};

function sortVersions(a: Version, b: Version) {
  return a.value.localeCompare(b.value);
}

function compareVersions(
  version1: Version['value'],
  version2: Version['value']
) {
  const segments1 = version1.split('.');
  const segments2 = version2.split('.');

  for (let i = 0; i < segments1.length; i++) {
    const segment1 = parseInt(segments1[i], 10);
    const segment2 = parseInt(segments2[i], 10);

    if (segment1 > segment2) {
      return 'greater_than';
    } else if (segment1 < segment2) {
      return 'less_than';
    }
  }

  return 'equal';
}

function setIsOverlapping(versions: Version[]) {
  return versions.map((currentVersion) => {
    const isOverlapping = versions.some((otherVersion) => {
      // don't compare to itself
      if (currentVersion.id === otherVersion.id) {
        return false;
      }

      const currentRelation = compareVersions(
        currentVersion.value,
        otherVersion.value
      );

      if (
        (currentRelation === 'equal' &&
          ['equal', 'less_than_or_equal', 'greater_than_or_equal'].includes(
            otherVersion.operator
          ) &&
          !['less_than', 'greater_than'].includes(currentVersion.operator)) ||
        (currentRelation === 'greater_than' &&
          (['greater_than', 'greater_than_or_equal'].includes(
            otherVersion.operator
          ) ||
            ['less_than', 'less_than_or_equal'].includes(
              currentVersion.operator
            ))) ||
        (currentRelation === 'less_than' &&
          (['less_than', 'less_than_or_equal'].includes(
            otherVersion.operator
          ) ||
            ['greater_than', 'greater_than_or_equal'].includes(
              currentVersion.operator
            )))
      ) {
        return true;
      }
      return false;
    });

    return {
      ...currentVersion,
      isOverlapping,
    };
  });
}
