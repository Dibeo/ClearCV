import { renderHook, act } from '@testing-library/react';
import { useCvStore } from '../useCvStore';

import Swal from 'sweetalert2';
import { INITIAL_CV_DATA, EMPTY_CV_DATA } from '../../domain/cv.constants';
import { beforeEach, describe, expect, it, vi } from 'vitest';

// Mock SweetAlert2 – the default export is an object with a `fire` method.
vi.mock('sweetalert2', () => {
  const fire = vi.fn();
  return { __esModule: true, default: { fire } };
});

describe('useCvStore', () => {
  // Mock a minimal localStorage for the persisted zustand middleware.
  beforeEach(() => {
    // Mock a simple localStorage that returns the initial data for the persist middleware.
    const stored = JSON.stringify({ state: { data: INITIAL_CV_DATA } });
    vi.stubGlobal('localStorage', {
      clear: vi.fn(),
      getItem: vi.fn().mockImplementation((key: string) => (key === 'cv-storage' ? stored : null)),
      setItem: vi.fn(),
      removeItem: vi.fn(),
    } as unknown);
  });

  it('should merge partial data without losing existing fields', () => {
    const { result } = renderHook(() => useCvStore());
    const newMeta: Partial<import('../../domain/cv.types').CVData['metadata']> = { name: 'John Doe' };
    act(() => {
      result.current.updateData({ metadata: newMeta });
    });
    expect(result.current.data.metadata.name).toBe('John Doe');
    // Verify that unrelated parts of the state stay untouched.
    expect(result.current.data.personalInfo.fullName).toBe(INITIAL_CV_DATA.personalInfo.fullName);
    expect(result.current.data.experiences).toEqual(INITIAL_CV_DATA.experiences);
  });

  it('reset should restore the initial data when the user confirms', async () => {
    const mockFire = vi.mocked(Swal).fire;
    // First call – confirmation dialog → user confirms.
    mockFire.mockResolvedValueOnce({ isConfirmed: true });
    // Second call – success toast (no payload needed).
    mockFire.mockResolvedValueOnce({});

    const { result } = renderHook(() => useCvStore());
    // Mutate state first.
    act(() => {
      result.current.updateData({ metadata: { name: 'Changed' } as Partial<import('../../domain/cv.types').CVData['metadata']> });
    });
    expect(result.current.data.metadata.name).toBe('Changed');

    // Invoke reset (await because it is async).
    await act(async () => {
      await result.current.reset();
    });

    // After a successful reset the store must match the constant.
    // After reset we expect the store to contain the EMPTY_CV_DATA (blank CV).
    expect(result.current.data).toMatchObject(EMPTY_CV_DATA);
    // Verify that the metadata name is the "Nouveau CV" constant.
    expect(result.current.data.metadata.name).toBe(EMPTY_CV_DATA.metadata.name);
    // The other arrays should be empty.
    expect(result.current.data.experiences).toHaveLength(0);
    expect(result.current.data.educations).toHaveLength(0);
    expect(result.current.data.skills).toEqual([]);
    expect(result.current.data.languages).toHaveLength(0);
    expect(result.current.data.certifications).toHaveLength(0);
    expect(result.current.data.personalInfo.fullName).toBe('');
    expect(result.current.data.personalInfo.title).toBe('');
    expect(result.current.data.personalInfo.summary).toBe('');
    // Two Swal.fire calls: confirmation + success toast.
    expect(mockFire).toHaveBeenCalledTimes(2);
  });
});
