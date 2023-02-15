'use strict';

const fs = require('fs');
// const { resolve } = require('path');
const path = require('path');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);

// const moduleFileExtensions = [
//   'web.mjs',
//   'mjs',
//   'web.js',
//   'js',
//   'web.ts',
//   'ts',
//   'web.tsx',
//   'tsx',
//   'json',
//   'web.jsx',
//   'jsx',
// ];

// Resolve file paths in the same order as webpack
// const resolveModule = (resolveFn, filePath) => {
//   const extension = moduleFileExtensions.find((extension) => fs.existsSync(resolveFn(`${filePath}.${extension}`)));

//   if (extension) {
//     return resolveFn(`${filePath}.${extension}`);
//   }

//   return resolveFn(`${filePath}.js`);
// };

module.exports = {
  dotenv: resolveApp('.env'),
  appPath: resolveApp('.'),
  appBuild: resolveApp('build'),
  appDistBuildStats: resolveApp('dist/static/build-stats.json'),
  appDist: resolveApp('dist'),
  appDistStatic: resolveApp('dist/static'),
  appClientPublic: resolveApp('client/public'),
  appServerPublic: resolveApp('server/public'),
  appClientHtml: resolveApp('client/templates/default.html'),
  appServerHtml: resolveApp('server/templates/default.html'),
  appClientHtmlTemplateInput: resolveApp('client/templates/default.html'),
  appServerHtmlTemplateInput: resolveApp('server/templates/default.html'),
  appClientHtmlTemplateOutput: resolveApp('dist/app.html'),
  appServer: resolveApp('server'),
  appIndexJs: resolveApp('src/index.js'),
  appPackageJson: resolveApp('package.json'),
  appSrc: resolveApp('src'),
  yarnLockFile: resolveApp('yarn.lock'),
  appNodeModules: resolveApp('node_modules'),
  appRouteHelloRoute: resolveApp('src/routes/HelloRoute/index.js'),
};
