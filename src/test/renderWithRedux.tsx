// import React, { JSXElementConstructor, ReactElement } from 'react';
// import { Queries, render as rtlRender, RenderOptions, RenderResult } from '@testing-library/react';
// import { Provider } from 'react-redux';
// import { reducer } from '../redux';
// import { configureStore } from '@reduxjs/toolkit';

// interface reduxSettings {
//   preloadedState?: Record<string, unknown>;
//   store?: ReturnType<typeof configureStore>;
//   renderOptions?: RenderOptions;
// }

// type rtlRenderObject = RenderResult<Queries, HTMLElement>;

// export const render = (
//   // React Testing Library defines the JSX param with an any type, so we'll use that and disable the eslint rule here
//   /* eslint-disable */
//   ui: ReactElement<any, string | JSXElementConstructor<any>>,
//   /* eslint-enable */
//   { preloadedState, store = configureStore({ reducer, preloadedState }), ...renderOptions }: reduxSettings,
// ): rtlRenderObject => {
//   const Wrapper: React.FC = ({ children }) => {
//     return <Provider store={store}>{children}</Provider>;
//   };
//   return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
// };
