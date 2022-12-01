/* 
  The purpose of this file is to describe to node how to run an express server rendering the results of a react app locally.

  Everything you see here is parsed, served by node/express exclusively and is for local development only! Run yarn build-server to get a production server.js file

*/

import path from 'path';
import fs from 'fs';
import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import App, { AppProvider } from '../src/app/index';
//import StyleContext from 'isomorphic-style-loader/StyleContext';

const app = express();
const port = process.env.PORT || 8000;
const __dirname = path.resolve();
const DEFAULT_TEMPLATE = path.join(__dirname, 'dist', 'app.html');

/* Step 1: Define all the routes our express server should be able to resolve */
const routes = {
  status: '/status',
  default: '*',
};

/* Step 2: Define any static files we want express to serve from its local directory */
const DIST_DIR = path.join(__dirname, 'dist');
const STATIC_DIR = path.join(__dirname, 'dist', 'static');
const PUBLIC_DIR = path.join(__dirname, 'server', 'public');

app.use(express.static(DIST_DIR));
app.use(express.static(STATIC_DIR));
app.use(express.static(PUBLIC_DIR));

// app.set('views', path.join(__dirname, 'public'));
// app.set('view engine', 'html');
// app.engine('html', ejs.renderFile);

/* Step 3: Define route to response mapping here */
// '/status' - server health check
app.get(routes.status, (req, res) => {
  res.send('Status OK');
});

// Any route not matching the ones listed above
app.get(routes.default, (req, res) => {
  // Step 1: Create the context for the server-side rendered app from the express request
  try {
    // const staticRouterProps = {
    //   location: req.url,
    //   context: {
    //     host: req.headers.host,
    //     path: req.path,
    //     query: req.query,
    //     url: req.url,
    //   },
    // };

    // 1. Select the correct template, in this cause default
    let template = fs.readFileSync(DEFAULT_TEMPLATE, 'utf8');

    // TO-DO: Have a more intelligent template selector based on express url routing rules
    // 2. Update the HTML head
    template = template.replace(/%title%/, 'Aviator Server Rendered App');

    // 2. Inject the server-rendered React app into the template
    // const css = new Set();
    // const insertCss = (...styles) => {
    //   styles.forEach((style) => {
    //     css.add(style._getCss());
    //   });
    // };
    // template = template.replace(/criticalCss{white-space:normal;}/, [...css].join(''));

    // 3. Inject the client script (webpack needs to do this)
    // let templateWithCriticalCSSandClientScriptInjected = templateWithCriticalCssInjected.replace(/var client;}/, "var clientInjected;");
    let state = {
      myState: 'isServer',
    };
    template = template.replace(/window/, `window.__INITIAL_DATA__ = ${JSON.stringify(state)}`);

    // 4. Server side render this route ...
    const serverRender = ReactDOMServer.renderToString(
      <React.StrictMode>
        <StaticRouter>
          <AppProvider>
            <App />
          </AppProvider>
        </StaticRouter>
      </React.StrictMode>,
    );
    // 4a. Inject the server-side rendered react code into the injected template
    template = template.replace(/aviator-client/, 'aviator');
    let fullPayload = template.replace(/%aviator%/, serverRender);

    // And send it to the client
    return res.send(fullPayload);
  } catch (e) {
    if (e instanceof Error) {
      console.error(e.message, e.stack);
    } else {
      console.error('Error:', e);
    }
    return res.end(e.message);
  }
});

/* Step 3: Start the server */
app.listen(8000, '127.0.0.1', () => {
  console.log(`Running 'aviator' at http://localhost:${port} ...`);
});
