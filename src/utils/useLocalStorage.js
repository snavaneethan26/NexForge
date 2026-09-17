import { useState } from 'react';

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw != null) return JSON.parse(raw);
    } catch {
      // corrupted or unavailable storage — fall back to initial
    }
    return typeof initialValue === 'function' ? initialValue() : initialValue;
  });

  const set = (next) => {
    setValue((prev) => {
      const resolved = typeof next === 'function' ? next(prev) : next;
      try {
        localStorage.setItem(key, JSON.stringify(resolved));
      } catch {
        // ignore write failures
      }
      return resolved;
    });
  };

  const remove = () => {
    try {
      localStorage.removeItem(key);
    } catch {
      // ignore
    }
    setValue(typeof initialValue === 'function' ? initialValue() : initialValue);
  };

  return [value, set, remove];
}
