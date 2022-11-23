import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import { BrowserRouter } from 'react-router-dom';
import StyleContext from 'isomorphic-style-loader/StyleContext';
import './index.scss';

// @ts-ignore
const insertCss = (...styles) => {
  const removeCss = styles.map((style) => style._insertCss());
  return () => removeCss.forEach((dispose) => dispose());
};

// @ts-ignore
// When in client development mode, use ReactDOM.render for clean render, otherwise always hydrate.
const renderMethod = module.hot ? ReactDOM.render : ReactDOM.hydrate;

renderMethod(
  <React.StrictMode>
    <StyleContext.Provider value={{ insertCss }}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StyleContext.Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
