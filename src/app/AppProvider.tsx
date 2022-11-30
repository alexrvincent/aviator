import React from 'react';
import useFontFaceObserver from 'use-font-face-observer';

// AppProvider.tsx

// A centralized place for all Context/Providers to live and be exported.

// Rules around using/making new contexts:

// MAKE a new context when one of the following applies:
// A. You need to store and pass a NEW piece of data to a NEW part/parts of the app that is likely to *change* often.

// REUSE a context when one of the following applies:
// A. A piece of data (or collection of data) already exists in one or more Context
// B. You need to store and pass a NEW READ-ONLY pieces of data that will likely never change.

// Remember all subscribers to a context will RERENDER when the context changes, so make sure
// to split out contexts if they're only being used in one area.

// 1. Add new contexts here if it makes sense to break them out (i.e, only one part of the app cares about it)
export const AppContext = React.createContext({}); // AppContext - a context of all contexts.
export const FontContext = React.createContext(false); // FontContext - a context storing whether fonts have been loaded into the app

const AppProvider: React.FC = (props) => {
  // 2. Add the data for your contexts here
  const contexts = {
    FontContext: useFontFaceObserver([
      {
        family: `Poppins`,
        weight: `normal`,
      },
    ]),
  };

  // 3. Optional - assemble the contexts how you'd like to inject as the value of your new context

  // 4. Nest the contexts together and pass them the values you'd like
  return (
    <AppContext.Provider value={contexts}>
      <FontContext.Provider value={contexts.FontContext}>{props.children}</FontContext.Provider>
    </AppContext.Provider>
  );
};

// 4. Export default the AppProvider to wrap the App
export default AppProvider;
