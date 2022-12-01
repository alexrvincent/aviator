import React from 'react';
// import React, { Suspense, lazy } from 'react';
import Routes from 'Routes/index';
import NavBar from 'Components/NavBar';
import { classNames } from 'util/index';

// const NavBar = lazy(() => import('Components/NavBar'));
// const Routes = lazy(() => import('Routes/index'));

const App: React.FC = () => {
  // Root level class name. Use sparingly.
  const cls = classNames({
    app: true,
  });

  return (
    <div className={cls}>
      {/* <Suspense fallback={<div> LOADING </div>}> */}
      <NavBar />
      {/* </Suspense> */}
      {/* Add top level app integrations here (Redux, Router, Internationalization), etc. For adding Contexts, see AppProvider.tsx */}
      {/* // <Suspense fallback={<div> LOADING </div>}> */}
      <Routes />
      {/* // </Suspense> */}
    </div>
  );
};

export default App;
