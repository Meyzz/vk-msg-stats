import React, { FC, createContext, useContext } from 'react';
import { RootStore } from 'stores';

let store: RootStore;

const StoreContext = createContext<RootStore | undefined>(undefined);

export const RootStoreProvider: FC = ({ children }) => {
  const root = store ?? new RootStore();

  return <StoreContext.Provider value={root}>{children}</StoreContext.Provider>;
};

export const useRootStore = (): RootStore => {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error('useRootStore must be used within RootStoreProvider');
  }
  return context;
};
