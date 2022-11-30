import React, { useContext } from 'react';
import { FontContext } from 'App/AppProvider';

// @ts-ignore
const useFontContext = (): React.Context => {
  const context = useContext(FontContext);

  if (context === undefined || context === null) {
    throw new Error('useFontContext must be used within the FontContext.Provider');
  }

  return context;
};

export default useFontContext;
