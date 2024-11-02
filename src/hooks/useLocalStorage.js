import { useState, useEffect } from 'react';

const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(() => {
    const store = window.localStorage.getItem(key);
    return store ? JSON.parse(store) : initialValue;
  });

  useEffect(() => {
    const store = JSON.stringify(value);
    window.localStorage.setItem(key, store);
  }, [value, key]);

  return [value, setValue];
};

export default useLocalStorage;
