/* 
  The purpose of this file is to describe to node how to run an express server rendering the results of a react app locally.
  Everything you see here is parsed, served by node/express exclusively and is for local development only! Run yarn build-server to get a production server.js file
*/

import path from 'path';
import fs from 'fs';
import express from 'express';
import expressStaticGzip from 'express-static-gzip';

import serverSideRender from './serverSideRender';
import logError from './logError';

const app = express();
const port = process.env.PORT || 8000;
const __dirname = path.resolve();

/* Step 1: Define all possible routes our express server can serve */
const routes = {
  static: {
    public: path.join(__dirname, 'server', 'public'),
    robots: path.join(__dirname, 'server', 'public', 'robots.txt'),
    js: path.join(__dirname, 'dist', 'static', 'js'),
    css: path.join(__dirname, 'dist', 'static', 'css'),
  },
  public: {
    default: '*',
    status: '/status',
    robots: '/robots.txt',
    js: '/static/js/',
    css: '/static/css/',
  },
};

/* Step 2: Map public routes to all static routes to serve static content (js, css, SEO related files */
// '/' - public folder for icons, manifest, and other SEO related files.
app.use(express.static(routes.static.public));

// '/static/js' - where all of our app JavaScript chunks come from.
app.use(
  routes.public.js,
  expressStaticGzip(routes.static.js, {
    enableBrotli: true,
    orderPreference: ['br', 'gz'],
    setHeaders: function (res) {
      res.setHeader('Cache-Control', 'public, max-age=31536000');
    },
  }),
);

// '/static/css' - where all of our app CSS chunks come from.
app.use(
  routes.public.css,
  expressStaticGzip(routes.static.css, {
    enableBrotli: true,
    orderPreference: ['br', 'gz'],
    setHeaders: function (res) {
      res.setHeader('Cache-Control', 'public, max-age=31536000');
    },
  }),
);

/* Step 3: Map our public routes to a dynamic server response */
// '/status' - server health check
app.get(routes.public.status, (req, res) => {
  res.statusCode = 200;
  res.send('Status OK');
});

// '/robots.txt' - serve robots.txt file to SEO and crawlers
app.get(routes.public.robots, (req, res) => {
  const robotsTxt = fs.readFileSync(routes.static.robots);
  res.send(robotsTxt);
});

// "*" - all other routes default to React. This is where server side rendering occurs.
app.get(routes.public.default, (req, res) => {
  try {
    serverSideRender(req.url, res);
  } catch (e) {
    // If the server cannot server side render, send the backup client build and let the client render everything
    logError('app.get(*)', e);
    res.statusCode = 500;
    const options = { root: 'dist' };
    res.sendFile('app.html', options, function (e) {
      if (e) {
        logError('app.get(*), sendFile()', e);
        res.writeHead(500);
        res.end();
      }
    });
  }
});

/* Step 4: Start the express server */
app
  .listen(port, () => {
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
      case 'EADDRINUSE':
        console.error(bind + ' is already in use');
        process.exit(1);
      default:
        throw error;
    }
  });
