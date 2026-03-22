import { renderHook } from '@testing-library/react';

import { useViewportMode } from './useViewportMode';

const installMatchMedia = (matches: boolean): void => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: () => ({
      matches,
      media: '(max-width: 1023px)',
      onchange: null,
      addEventListener: () => {},
      removeEventListener: () => {},
      addListener: () => {},
      removeListener: () => {},
      dispatchEvent: () => false,
    }),
  });
};

describe('useViewportMode', () => {
  it('should detect narrow viewports from matchMedia', () => {
    installMatchMedia(true);

    const { result } = renderHook(() => useViewportMode());

    expect(result.current).toBe(true);
  });
});
