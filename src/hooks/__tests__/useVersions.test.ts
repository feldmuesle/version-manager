import { renderHook, act } from '@testing-library/react';
import { useVersions } from '../useVersions';

describe('hook return values', () => {
  it('returns correct methods and values', () => {
    const { result } = renderHook(() => useVersions('production'));

    expect(result.current).toEqual({
      submitVersion: expect.any(Function),
      updateVersion: expect.any(Function),
      deleteVersion: expect.any(Function),
      versions: expect.any(Array),
    });
  });

  it('can add a version', () => {
    const { result } = renderHook(() => useVersions('production'));
    act(() => {
      result.current.submitVersion('equal', '1.2.3');
    });

    expect(result.current.versions).toEqual([
      {
        operator: 'equal',
        value: '1.2.3',
        type: 'production',
        id: expect.any(String),
        isOverlapping: false,
      },
    ]);
  });

  it('can update a version', () => {
    const { result } = renderHook(() => useVersions('production'));

    act(() => {
      result.current.submitVersion('equal', '1.2.3');
    });

    const { id, operator, type, isOverlapping } = result.current.versions[0];

    act(() => {
      result.current.updateVersion({
        id,
        operator,
        value: '1.2.4',
      });
    });

    expect(result.current.versions).toEqual([
      {
        operator: 'equal',
        value: '1.2.4',
        type,
        id,
        isOverlapping,
      },
    ]);
  });

  it('can delete a version', () => {
    const { result } = renderHook(() => useVersions('production'));

    act(() => {
      result.current.submitVersion('equal', '1.2.3');
    });

    expect(result.current.versions.length).toEqual(1);

    act(() => {
      result.current.deleteVersion(result.current.versions[0].id);
    });

    expect(result.current.versions.length).toEqual(0);
  });

  it('sorts versions in ascending orders', () => {
    const { result } = renderHook(() => useVersions('production'));

    act(() => {
      result.current.submitVersion('equal', '1.2.3');
      result.current.submitVersion('equal', '1.3.6');
      result.current.submitVersion('equal', '1.2.5');
      result.current.submitVersion('equal', '0.5.4');
      result.current.submitVersion('equal', '1.1.4');
    });

    const expectedVersions = ['0.5.4', '1.1.4', '1.2.3', '1.2.5', '1.3.6'];

    expectedVersions.forEach((expectedVersion, index) => {
      expect(result.current.versions[index].value).toEqual(expectedVersion);
    });
  });
});

describe('version overlap detection', () => {
  it('marks only overlapping versions', () => {
    const { result } = renderHook(() => useVersions('production'));

    act(() => {
      result.current.submitVersion('equal', '1.2.3');
      result.current.submitVersion('equal', '1.2.3');
      result.current.submitVersion('equal', '1.2.4');
    });

    const overlappingVersions = result.current.versions.filter(
      (version) => version.value === '1.2.3'
    );
    const nonOverlappingVersions = result.current.versions.filter(
      (version) => version.value !== '1.2.3'
    );
    overlappingVersions.forEach((version) => {
      expect(version.isOverlapping).toBe(true);
    });

    expect(nonOverlappingVersions[0].isOverlapping).toBe(false);
  });

  it('marks versions as overlapping if using "equal" operator and having same value', () => {
    const { result } = renderHook(() => useVersions('production'));

    act(() => {
      result.current.submitVersion('equal', '1.2.3');
      result.current.submitVersion('equal', '1.2.3');
    });
    result.current.versions.forEach((version) => {
      expect(version.isOverlapping).toBe(true);
    });
  });

  it('marks versions as overlapping if using "greater_than" operator and having versions that fit that range', () => {
    const { result } = renderHook(() => useVersions('production'));

    act(() => {
      result.current.submitVersion('greater_than', '1.2.3');
      result.current.submitVersion('equal', '1.2.4');
    });
    result.current.versions.forEach((version) => {
      expect(version.isOverlapping).toBe(true);
    });
  });

  it('marks versions as overlapping if using "greater_than_or_equal" operator and having versions that fit that range', () => {
    const { result } = renderHook(() => useVersions('production'));

    act(() => {
      result.current.submitVersion('greater_than_or_equal', '1.2.3');
      result.current.submitVersion('equal', '1.2.3');
      result.current.submitVersion('equal', '2.2.3');
    });
    result.current.versions.forEach((version) => {
      expect(version.isOverlapping).toBe(true);
    });
  });

  it('marks versions as overlapping if using "less_than" operator and having versions that fit that range', () => {
    const { result } = renderHook(() => useVersions('production'));

    act(() => {
      result.current.submitVersion('less_than', '1.2.3');
      result.current.submitVersion('equal', '0.2.3');
    });
    result.current.versions.forEach((version) => {
      expect(version.isOverlapping).toBe(true);
    });
  });

  it('marks versions as overlapping if using "less_than_or_equal" operator and having versions that fit that range', () => {
    const { result } = renderHook(() => useVersions('production'));

    act(() => {
      result.current.submitVersion('less_than_or_equal', '1.2.3');
      result.current.submitVersion('equal', '1.2.3');
      result.current.submitVersion('equal', '0.2.3');
    });

    result.current.versions.forEach((version) => {
      expect(version.isOverlapping).toBe(true);
    });
  });

  it('does not mark version if values are equal, but operator point to "less_than"', () => {
    const { result } = renderHook(() => useVersions('production'));

    act(() => {
      result.current.submitVersion('less_than', '1.2.3');
      result.current.submitVersion('equal', '1.2.3');
    });

    result.current.versions.forEach((version) => {
      expect(version.isOverlapping).toBe(false);
    });
  });

  it('does not mark version if values are equal, but operator point to "greater_than"', () => {
    const { result } = renderHook(() => useVersions('production'));

    act(() => {
      result.current.submitVersion('greater_than', '1.2.3');
      result.current.submitVersion('equal', '1.2.3');
    });

    result.current.versions.forEach((version) => {
      expect(version.isOverlapping).toBe(false);
    });
  });
});
