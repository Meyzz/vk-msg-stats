import React, { useContext } from 'react';
import {Stores, storesContext} from 'stores';

export const useStores = (): Stores => {
  const context = useContext(storesContext);
  if (context === undefined) {
    throw new Error('useRootStore must be used within RootStoreProvider');
  }
  return context;
};
