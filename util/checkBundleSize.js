const fs = require('fs');
const glob = require('glob');

var stats = require('../dist/static/build-stats.json');
var metrics = require('../config/performance');
var basePath = './dist/';

function assetFilter(assetFilename) {
  return assetFilename.endsWith('.br') || assetFilename.endsWith('.css');
}

const files = {
  files: [
    {
      asset: `static/js/app.*.js.br`,
      maxSize: '30 kB',
      compression: 'brotli',
    },
    {
      asset: `static/js/vendor.*.js.br`,
      maxSize: '30 kB',
      compression: 'brotli',
    },
    {
      asset: `static/css/app.*.css`,
      maxSize: '30 kB',
      compression: 'none',
    },
  ],
};

const checkBundleSize = function () {
  if (!stats || !stats.assets || stats.assets.length === 0) {
    console.error(
      "🚨 Error: A build-stats.json couldn't be found or was incorrectly outputted. Try running 'yarn build-client' to generate the bundles and make sure an 'assets' object exists and contains assets.",
    );
  }

  let assetPaths = files.files.reduce((acc, row) => {
    let matchedPaths = glob.sync(basePath + row.asset);
    if (matchedPaths.length === 0) {
      console.error(`🚨 Error: There is no matching file for '${basePath + row.asset}' in ${process.cwd()}`);
      process.exit(1);
    }

    matchedPaths.forEach((matchedPath, index) => {
      matchedPaths[index] = matchedPath.replace(basePath, '');
    });

    acc.push(...matchedPaths);
    return acc;
  }, []);

  console.log(assetPaths);

  // for(let asset of stats.assets) {
  //   if(asset.name)
  // }
  // console.log(stats);
  // console.log(metrics);
};

checkBundleSize();
