import type { StateStorage } from "zustand/middleware";

export function createSessionStorage(): StateStorage {
  return {
    getItem: (name: string): string | null => {
      if (typeof window === "undefined") return null;
      return window.sessionStorage.getItem(name);
    },
    setItem: (name: string, value: string) => {
      if (typeof window !== "undefined") {
        window.sessionStorage.setItem(name, value);
      }
    },
    removeItem: (name: string) => {
      if (typeof window !== "undefined") {
        window.sessionStorage.removeItem(name);
      }
    },
  };
}
