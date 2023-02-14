// @ts-nocheck
import React from 'react';
import useFontFaceObserver from 'use-font-face-observer';

// FontContext - a context storing whether fonts have been loaded into the app
const FontContext = React.createContext(false);

export const FontProvider: React.FC = ({ children }) => {
  const value = useFontFaceObserver([
    {
      family: `poppins-regular`,
    },
  ]);

  return <FontContext.Provider value={value}>{children}</FontContext.Provider>;
};

export default FontContext;
