import React from 'react';
import './App.scss';
import Routes from 'Routes/index';
import classNames from 'util/classNames';
// import store from './redux/index';
// import { Provider } from 'react-redux';

const App: React.FC = () => {
  // Root level class name. Use sparingly.
  const cls = classNames({
    app: true,
  });

  return (
    <div className={cls}>
      {/* Add top level app integrations here (Redux, Router, Context, Internationalization), etc */}
      {/* <Provider store={store}> */}
      <Routes />
      {/* </Provider> */}
    </div>
  );
};

export default App;
