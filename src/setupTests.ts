import { vi } from 'vitest';

// Mock a minimal localStorage that satisfies Zustand's persist middleware.
vi.stubGlobal('localStorage', {
  clear: vi.fn(),
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
});

import '@testing-library/jest-dom';
