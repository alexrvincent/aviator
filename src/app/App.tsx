import React, { Suspense } from 'react';
import { StaticRouter } from 'react-router-dom/server';
import { BrowserRouter } from 'react-router-dom';

/* Core JS */
import { Html, AppProvider, NavBar, Routes, classNames } from 'Core/index';

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
  const ReactRouter = isServer ? StaticRouter : BrowserRouter;
  /* Add top level app integrations here (Redux, Router, Internationalization), etc. For adding Contexts, see AppProvider.tsx */

  return (
    /* @ts-ignore */
    <React.StrictMode>
      {/* @ts-ignore */}
      <Html assets={assets} title={title} isServer={isServer} isDevServer={isDevServer}>
        {/* @ts-ignore */}
        <AppProvider isServer={isServer}>
          {/* @ts-ignore */}
          <ReactRouter location={location}>
            <div className={cls}>
              <NavBar />
              <div className={clsContent}>
                <Suspense fallback={<div> LOADING </div>}>
                  <Routes />
                </Suspense>
              </div>
            </div>
          </ReactRouter>
        </AppProvider>
      </Html>
    </React.StrictMode>
  );
};

export default App;
