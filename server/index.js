/* 
  The purpose of this file is to describe to node how to run an express server rendering the results of a react app locally.

  Everything you see here is parsed, served by node/express exclusively and is for local development only!

*/

import path from 'path';
const express = __non_webpack_require__('express');
const app = express();
const port = process.env.PORT || 8000;
const __dirname = path.resolve();
const DIST_DIR = path.join(__dirname, 'dist');
const STATIC_DIR = path.join(__dirname, 'dist', 'static');
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import App from '../src/app';

/* Step 1: Define all the routes our express server should be able to resolve */
const routes = {
  status: '/status',
  default: '/*',
};

/* Step 2: Define any static files we want express to serve from its local directory */
app.use(express.static(DIST_DIR));
app.use(express.static(STATIC_DIR));
// app.use(express.static(PUBLIC_DIR))

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
    const staticRouterProps = {
      location: req.url,
      context: {
        host: req.headers.host,
        path: req.path,
        query: req.query,
        url: req.url,
      },
    };

    const reactApp = ReactDOMServer.renderToString(
      <StaticRouter {...staticRouterProps}>
        <App />
      </StaticRouter>,
    );

    let html = `
      <!DOCTYPE html>
      <html lang="en">

        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>aviator-server</title>

        <body>
          <div id="root">${reactApp}</div>
        </body>

      </html>
    `;

    return res.send(html);
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
app.listen(port, () => {
  console.log(`Running 'aviator' at http://localhost:${port} ...`);
});
