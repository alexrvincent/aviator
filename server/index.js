/* 
  The purpose of this file is to describe to node how to run an express server rendering the results of a react app locally.
  Everything you see here is parsed, served by node/express exclusively and is for local development only! Run yarn build-server to get a production server.js file
*/

import path from 'path';
import fs from 'fs';
import express from 'express';
import React from 'react';
import { renderToPipeableStream } from 'react-dom/server';
import App from '../src/app/index';
import expressStaticGzip from 'express-static-gzip';

const app = express();
const port = process.env.PORT || 8000;
const __dirname = path.resolve();
const BUILD_STATS = path.join(__dirname, 'dist', 'static', 'build-stats.json');

/* Step 1: Define all the routes our express server should be able to resolve */
const routes = {
  status: '/status',
  robots: '/robots.txt',
  default: '*',
};

/* Step 2: Define any static files we want express to serve from its local directory */
// const DIST_DIR = path.join(__dirname, 'dist');
const STATIC_JS_DIR = path.join(__dirname, 'dist', 'static', 'js');
const STATIC_CSS_DIR = path.join(__dirname, 'dist', 'static', 'css');
const PUBLIC_DIR = path.join(__dirname, 'server', 'public');

app.use(express.static(PUBLIC_DIR));
app.use(
  '/static/js/',
  expressStaticGzip(STATIC_JS_DIR, {
    enableBrotli: true,
    orderPreference: ['br', 'gz'],
    setHeaders: function (res) {
      res.setHeader('Cache-Control', 'public, max-age=31536000');
    },
  }),
);
app.use(
  '/static/css/',
  expressStaticGzip(STATIC_CSS_DIR, {
    enableBrotli: true,
    orderPreference: ['br', 'gz'],
    setHeaders: function (res) {
      res.setHeader('Cache-Control', 'public, max-age=31536000');
    },
  }),
);

// app.set('views', path.join(__dirname, 'public'));
// app.set('view engine', 'html');
// app.engine('html', ejs.renderFile);

/* Step 3: Define route to response mapping here */
// '/status' - server health check
app.get(routes.status, (req, res) => {
  res.send('Status OK');
});

app.get(routes.robots, (req, res) => {
  const ROBOTS_TXT = path.join(__dirname, 'server', 'public', 'robots.txt');
  const robotsTxt = fs.readFileSync(ROBOTS_TXT);
  res.send(robotsTxt);
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

    render(req.url, res);

    // And send it to the client
    // return res.send(fullPayload);
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
app
  .listen(8000, '127.0.0.1', () => {
    console.log(`Running 'aviator' at http://localhost:${port} ...`);
  })
  .on('error', function (error) {
    if (error.syscall !== 'listen') {
      throw error;
    }
    const isPipe = (portOrPipe) => Number.isNaN(portOrPipe);
    const bind = isPipe(port) ? 'Pipe ' + port : 'Port ' + port;
    switch (error.code) {
      case 'EACCES':
        console.error(bind + ' requires elevated privileges');
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(bind + ' is already in use');
        process.exit(1);
        break;
      default:
        throw error;
    }
  });

function render(url, res) {
  // Stream
  res.socket.on('error', (error) => {
    console.error('Fatal', error);
  });

  let buildStats = fs.readFileSync(BUILD_STATS);
  buildStats = JSON.parse(buildStats);
  let js = [];
  let css = [];
  let assets = {
    js,
    css,
  };
  Object.values(buildStats.assetsByChunkName).forEach((chunk) => {
    let onlyJavaScript = chunk.filter(
      (asset) => asset.endsWith('.js') && (asset.startsWith('static/js/core') || asset.startsWith('static/js/vendor')),
    );
    let onlyCSS = chunk.filter((asset) => asset.endsWith('.css') && asset.startsWith('static/css/core'));
    js.push(...onlyJavaScript);
    css.push(...onlyCSS);
  });

  // 3. Inject the client script (webpack needs to do this)
  // let state = {
  //   myState: 'isServer',
  // };

  let documentTitle = 'Aviator Server Build';

  const stream = renderToPipeableStream(<App assets={assets} location={url} title={documentTitle} isServer />, {
    // identifierPrefix?: string,
    // namespaceURI?: string,
    // nonce?: string,
    // bootstrapScriptContent?: string,
    // bootstrapScripts?: Array<string>,
    // bootstrapModules?: Array<string>,
    // progressiveChunkSize?: number,
    // onShellReady?: () => void,
    // onShellError?: () => void,
    // onAllReady?: () => void,
    // onError?: (error: mixed) => void,
    bootstrapScripts: js,
    onShellError() {
      // Something errored before we could complete the shell so we emit an alternative shell.
      res.statusCode = 500;
      res.send('<!doctype html><p>Loading...</p><script src="clientrender.js"></script>');
    },
    onShellReady() {
      // If something errored before we started streaming, we set the error code appropriately.
      res.setHeader('Content-type', 'text/html');
      stream.pipe(res);
    },
    onError(x) {
      console.error(x);
    },
  });
}

// function handleErrors(fn) {
//   return async function (req, res, next) {
//     try {
//       return await fn(req, res);
//     } catch (x) {
//       next(x);
//     }
//   };
// }

// async function waitForWebpack() {
//   while (true) {
//     try {
//       readFileSync(path.resolve(__dirname, '../dist/static/build-stats.json'));
//       return;
//     } catch (err) {
//       console.log('Could not find webpack build output. Will retry in a second...');
//       await new Promise((resolve) => setTimeout(resolve, 1000));
//     }
//   }
// }
