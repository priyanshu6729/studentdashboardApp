export const setLocalStorage = (key: string, value: any) => {
  if (typeof window !== 'undefined' && value !== undefined) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.warn("Error setting localStorage", error);
    }
  }
};

export const getLocalStorage = (key: string) => {
  if (typeof window !== 'undefined') {
    const value = localStorage.getItem(key);
    if (value && value !== "undefined") {
      try {
        return JSON.parse(value);
      } catch (error) {
        console.warn("JSON parse error:", error);
        return null;
      }
    }
  }
  return null;
};

export const removeLocalStorage = (key: string) => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(key);
  }
};
