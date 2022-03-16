import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/App';
import './index.scss';
// import store from './redux/index';
// import { Provider } from 'react-redux';

ReactDOM.render(
  <React.StrictMode>
    {/* <Provider store={store}> */}
    <App />
    {/* </Provider> */}
  </React.StrictMode>,
  document.getElementById('root'),
);
