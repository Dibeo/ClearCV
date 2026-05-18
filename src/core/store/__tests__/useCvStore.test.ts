import { renderHook, act } from '@testing-library/react';
import { useCvStore } from '../useCvStore';
import Swal from 'sweetalert2';
import { INITIAL_CV_DATA } from '../../domain/cv.constants';
import { beforeEach, describe, expect, it, vi } from 'vitest';

// Mock SweetAlert2 – the default export is an object with a `fire` method.
vi.mock('sweetalert2', () => {
  const fire = vi.fn();
  return { __esModule: true, default: { fire } };
});

describe('useCvStore', () => {
  // Mock a minimal localStorage for the persisted zustand middleware.
  beforeEach(() => {
    // jsdom provides a stub, but we replace it with a simple mock that implements `clear`.
    vi.stubGlobal('localStorage', {
      clear: vi.fn(),
      getItem: vi.fn(),
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
    expect(result.current.data).toEqual(INITIAL_CV_DATA);
    // Two Swal.fire calls: confirmation + success toast.
    expect(mockFire).toHaveBeenCalledTimes(2);
  });
});
