import React from 'react';
import useStyles from 'isomorphic-style-loader/useStyles';
import s from './App.scss';
import Routes from 'Routes/index';
import NavBar from 'Components/NavBar';

// import classNames from 'util/classNames';
// import store from './redux/index';
// import { Provider } from 'react-redux';

const App: React.FC = () => {
  // Root level class name. Use sparingly.
  // const cls = classNames({
  //   app: true,
  // });

  useStyles(s);

  return (
    <div className={s.app}>
      {/* @ts-ignore */}
      <NavBar />
      {/* Add top level app integrations here (Redux, Router, Context, Internationalization), etc */}
      {/* <Provider store={store}> */}
      <Routes />
      {/* </Provider> */}
    </div>
  );
};

// export default App;
export default App;
