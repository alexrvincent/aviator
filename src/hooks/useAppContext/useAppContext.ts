import React, { useContext } from 'react';
import AppContext from 'Contexts/AppContext';

// @ts-ignore
const useAppContext = (): React.Context => {
  const context = useContext(AppContext);

  if (context === undefined || context === null) {
    throw new Error('useAppContext must be used within the AppContext.Provider');
  }

  return context;
};

export default useAppContext;
