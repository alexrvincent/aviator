// @ts-nocheck
import React from 'react';
import { AppProvider } from 'Contexts/AppContext';
import { FontProvider } from 'Contexts/FontContext';
import { QueryProvider } from 'Contexts/QueryContext';

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

// eslint-disable-next-line
const Provider = ({ isServer, children }) => {
  return (
    <>
      {/* Enables the use of react-query anywhere in the application */}
      <QueryProvider>
        {/* A global state context for the general state of the application */}
        <AppProvider isServer={isServer}>
          {/* Tells the app whether the primary font for the app has loaded */}
          <FontProvider>{children}</FontProvider>
        </AppProvider>
      </QueryProvider>
    </>
  );
};

export default Provider;
