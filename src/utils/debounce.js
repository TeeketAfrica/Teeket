import { useRef } from 'react';

export function useDebounce(callback, delay) {
  const debounceRef = useRef(null);

  return (...args) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => callback(...args), delay);
  };
}