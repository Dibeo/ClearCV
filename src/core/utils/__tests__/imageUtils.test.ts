/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import { describe, beforeEach, vi, afterEach, it, expect } from 'vitest';
import { getBase64ImageFromURL } from '../imageUtils';

describe('getBase64ImageFromURL', () => {
  const dummyDataURL = 'data:image/png;base64,TEST';

  beforeEach(() => {
    // Mock Image constructor – loads asynchronously to allow onload/onerror to be set before src
    (global as any).Image = class {
      width = 100;
      height = 100;
      onload: (() => void) | null = null;
      onerror: ((e: any) => void) | null = null;
      setAttribute(_: string, __: string) {}
      // Simulate async load when src is assigned
      set src(value: string) {
        // Defer execution to a micro‑task so that onload/onerror can be set first
        Promise.resolve().then(() => {
          if (value.includes('error')) {
            this.onerror?.(new Error('load error'));
          } else {
            this.onload?.();
          }
        });
      }
    };

    // Mock canvas
    const mockCanvas = {
      width: 0,
      height: 0,
      getContext: () => ({
        drawImage: vi.fn(),
      }),
      toDataURL: () => dummyDataURL,
    } as any;
    const originalCreateElement = document.createElement.bind(document);
    document.createElement = vi.fn().mockImplementation((tag) => {
      if (tag === 'canvas') return mockCanvas;
      // fallback to real implementation for other elements
      return originalCreateElement(tag);
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
    delete (global as any).Image;
  });

  it('should resolve with a base64 PNG data URL on successful load', async () => {
    await expect(getBase64ImageFromURL('http://example.com/image.png')).resolves.toBe(dummyDataURL);
  });

  it('should reject when the image fails to load', async () => {
    await expect(getBase64ImageFromURL('http://example.com/error.png')).rejects.toThrow();
  });
});
