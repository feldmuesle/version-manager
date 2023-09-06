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
