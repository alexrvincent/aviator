const glob = require('glob');

const stats = require('../dist/static/build-stats.json');
const performanceMetrics = require('../config/performance');
const basePath = './dist/';

const checkBundleSize = function () {
  // 1. Check to make sure we have data to analyze sitting in a valid build-stats.json
  if (!stats || !stats.assets || stats.assets.length === 0) {
    console.error(
      "🚨 Error: A build-stats.json couldn't be found or was incorrectly outputted. Try running 'yarn build-client' to generate the bundles and make sure an 'assets' object exists and contains assets.",
    );
  }

  // 2. Gather all the true asset paths after glob searching through the list of configured assets
  const assetPaths = performanceMetrics.budgets.assets.reduce((acc, row) => {
    let matchedPaths = glob.sync(basePath + row.assetPath);

    // If any path is not valid, throw an error and exit.
    if (matchedPaths.length === 0) {
      console.error(`🚨 Error: There is no matching file for '${row.assetPath}'`);
      process.exit(1);
    }

    // If any path does not have a maxSize, throw and error and exit.
    if (typeof row.maxSize !== 'number') {
      console.error(`🚨 Error: Asset '${row.assetPath}' has no valid maxSize set. Make sure to set an integer value!`);
      process.exit(1);
    }

    // Swap the asset path glob with its real value(s)
    let nextAcc = {};
    matchedPaths.forEach((matchedPath) => {
      const assetPath = matchedPath.replace(basePath, '');
      nextAcc = {
        ...acc,
        [assetPath]: {
          ...row,
          assetPath,
        },
      };
    });
    return nextAcc;
  }, {});

  let results = [];
  let errors = [];

  const calculateBudget = (asset) => {
    if (asset.size > assetPaths[asset.name].maxSize) {
      errors.push(`❌ '${asset.name}' → (${asset.size} of ${assetPaths[asset.name].maxSize})`);
    } else {
      results.push(`✔️  '${asset.name}' → (${asset.size} of ${assetPaths[asset.name].maxSize})`);
    }
  };

  // 3. Determine whether each asset has exceeded its budget
  for (let asset of stats.assets) {
    if (assetPaths[asset.name]) {
      calculateBudget(asset);

      // An asset may have related (compressed) assets. Check if they require budget checks too.
      if (asset.related && Array.isArray(asset.related) && asset.related.length > 0) {
        for (let relatedAsset of asset.related) {
          calculateBudget(relatedAsset);
        }
      }
    }
  }

  if (results.length) {
    console.log(results);
  }

  if (errors.length) {
    console.log(errors);

    // TO-DO: Alert CI / Github that bundle size has failed
    process.exit(1);
  }
};

checkBundleSize();
