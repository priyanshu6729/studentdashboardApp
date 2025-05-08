import { useState, useEffect } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === "undefined") return initialValue;
    try {
      const item = window.localStorage.getItem(key);

      // ✅ Handle invalid JSON or "undefined"
      return item && item !== "undefined" ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn("Error reading localStorage", error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      if (storedValue !== undefined) {
        window.localStorage.setItem(key, JSON.stringify(storedValue));
      }
    } catch (error) {
      console.warn("Error writing to localStorage", error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue] as const;
}
