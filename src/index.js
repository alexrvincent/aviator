import React from 'react';
// @ts-ignore
import * as ReactDOMClient from 'react-dom/client';
import App from 'App/App';
import AppProvider from 'App/AppProvider';
import { BrowserRouter } from 'react-router-dom';
// import StyleContext from 'isomorphic-style-loader/StyleContext';
import './index.scss';

// @ts-ignore
// const insertCss = (...styles) => {
//   const removeCss = styles.map((style) => style._insertCss());
//   return () => removeCss.forEach((dispose) => dispose());
// };

// When in client development mode, use ReactDOM.createRoot().render for clean render, otherwise always hydrateRoot.
// @ts-ignore

const Root = () => (
  <React.StrictMode>
    <BrowserRouter>
      <AppProvider>
        <App />
      </AppProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// @ts-ignore
if (module.hot) {
  ReactDOMClient.createRoot(document.getElementById('root')).render(<Root />);
} else {
  ReactDOMClient.hydrateRoot(document.getElementById('root'), <Root />);
}
