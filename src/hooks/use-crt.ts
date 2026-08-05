import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'crt-filter';

export function useCrtFilter() {
  const [enabled, setEnabled] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) !== 'off';
    } catch {
      return true;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, enabled ? 'on' : 'off');
    } catch {
      /* ignore */
    }
  }, [enabled]);

  const toggle = useCallback(() => setEnabled((prev) => !prev), []);

  return { enabled, toggle };
}
