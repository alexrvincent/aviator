// @ts-nocheck
import React from 'react';

// AppContext - a context of all contexts.
const AppContext = React.createContext({});

export const AppProvider: React.FC = ({ isServer, children }) => {
  const value = {
    isServer,
  };

  console.log(isServer);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContext;
