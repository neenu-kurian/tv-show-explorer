"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { useStore as useZustandStore, type StoreApi } from "zustand";

export function createStoreContext<TState extends object>(
  createStore: () => StoreApi<TState>,
  name: string,
) {
  const Context = createContext<StoreApi<TState> | null>(null);

  function Provider({ children }: { children: ReactNode }) {
    const [store] = useState(createStore);
    return <Context.Provider value={store}>{children}</Context.Provider>;
  }

  function useStore<T>(selector: (state: TState) => T): T {
    const store = useContext(Context);
    if (!store) {
      throw new Error(`use${name} must be used within a ${name}Provider`);
    }
    return useZustandStore(store, selector);
  }

  return { Provider, useStore };
}
