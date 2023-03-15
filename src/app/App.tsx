import React, { Suspense } from 'react';
import { StaticRouter } from 'react-router-dom/server';
import { BrowserRouter } from 'react-router-dom';

/* Core JS */
import Html from 'Features/Core/Html';
import Provider from 'Contexts/index';
import NavBar from 'Features/Core/NavBar';
import Routes from 'Routes/index';
import classNames from 'utils/classNames';

// @ts-ignore
const App: React.FC = ({ assets = {}, location, title, isServer = false, isDevServer = false }) => {
  // Root level class name. Use sparingly.
  const cls = classNames({
    app: true,
  });

  const clsContent = classNames({
    content: true,
  });

  // @ts-ignore
  const Router = isServer ? StaticRouter : BrowserRouter;
  /* Add top level app integrations here (Redux, Router, Internationalization), etc. For adding Contexts, see contexts/index.js */

  return (
    /* @ts-ignore */
    <React.StrictMode>
      {/* @ts-ignore */}
      <Html assets={assets} title={title} isServer={isServer} isDevServer={isDevServer}>
        <div className={cls}>
          {/* @ts-ignore */}
          <Provider isServer={isServer}>
            {/* @ts-ignore */}
            <Router location={location}>
              <NavBar />
              <div className={clsContent}>
                <Suspense fallback={<div> LOADING </div>}>
                  <Routes />
                </Suspense>
              </div>
            </Router>
          </Provider>
        </div>
      </Html>
    </React.StrictMode>
  );
};

export default App;
