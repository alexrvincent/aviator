// import React from 'react';
import React, { Suspense, lazy } from 'react';
// import Routes from 'Routes/index';
import NavBar from 'Components/NavBar';
import { classNames } from 'util/index';
import Html from './Html';
import AppProvider from './AppProvider';
import { StaticRouter } from 'react-router-dom/server';
import { BrowserRouter } from 'react-router-dom';

// const NavBar = lazy(() => import('Components/NavBar'));
const Routes = lazy(() => import('Routes/index'));

// @ts-ignore
const App: React.FC = ({ assets = {}, title, isServer = false, isDevServer = false }) => {
  // Root level class name. Use sparingly.
  const cls = classNames({
    app: true,
  });

  // @ts-ignore
  const ReactRouter = isServer ? StaticRouter : BrowserRouter;

  /* Add top level app integrations here (Redux, Router, Internationalization), etc. For adding Contexts, see AppProvider.tsx */

  return (
    /* @ts-ignore */
    <Html assets={assets} title={title} isDevServer={isDevServer}>
      {/* @ts-ignore */}
      <AppProvider isServer={isServer}>
        {/* @ts-ignore */}
        <ReactRouter>
          <div className={cls}>
            <NavBar />
            <Suspense fallback={<div> LOADING </div>}>
              <Routes />
            </Suspense>
          </div>
        </ReactRouter>
      </AppProvider>
    </Html>
  );
};

export default App;
