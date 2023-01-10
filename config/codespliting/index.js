// codesplitting/index.js - gathers configurations of how to code split our CSS, JavaScript, and node_modules (vendor) into cacheGroups - aka webpack chunks.

const vendorChunks = require('./vendor.js');
const moduleChunks = require('./module.js');
// const cssChunks = require('./css');

// Helper function assembles the regex webpack will use to split the main vendor chunk by package name
const getVendorChunkTestRegex = (bundleNames, localModules = []) => {
  let test = '';
  const excludedLibraries = [];
  const vendorChunkBasePath = '[\\/]node_modules[\\/]';
  if (!bundleNames.length) {
    for (const vendorChunkPackage of Object.keys(vendorChunks)) {
      for (const library of vendorChunks[vendorChunkPackage].libraries || []) {
        excludedLibraries.push(library);
      }
    }
    test = new RegExp(`${vendorChunkBasePath}(?!${excludedLibraries.join('|')}).*`);
  } else if (bundleNames) {
    let localModuleRegex = '';
    if (localModules.length) {
      localModuleRegex = `|${localModules.join('|')}`;
    }
    test = new RegExp(`${vendorChunkBasePath}(${bundleNames.join('|')}).*${localModuleRegex}`);
  }
  return test;
};

// Helper function that assembles the "cacheGroup" webpack config used to perform the vendor chunk splitting
const assembleCacheGroups = () => {
  const cacheGroups = {};
  const baseCacheGroupOptions = {
    reuseExistingChunk: true,
    chunks: 'all',
    enforce: true,
    priority: -1,
  };

  for (const moduleChunk of Object.keys(moduleChunks)) {
    cacheGroups[moduleChunk] = {
      ...baseCacheGroupOptions,
      ...moduleChunks[moduleChunk],
      ...(moduleChunks[moduleChunk].options || []),
    };
  }

  for (const vendorChunk of Object.keys(vendorChunks)) {
    const librariesList = vendorChunks[vendorChunk].libraries || [];
    const localModuleList = vendorChunks[vendorChunk].localModules || [];
    cacheGroups[vendorChunk] = {
      test: getVendorChunkTestRegex(librariesList, localModuleList),
      name: vendorChunk,
      ...baseCacheGroupOptions,
      ...(vendorChunks[vendorChunk].options || []),
    };
  }

  // Special case the instance where we code split nothing, return the entire vendor folder untouched
  const cacheGroupNames = Object.keys(cacheGroups);
  if (cacheGroupNames.length === 1 && cacheGroupNames[0] === 'vendor') {
    return {
      vendor: {
        test: /[\\/]node_modules[\\/]/,
        name: 'vendor',
        ...baseCacheGroupOptions,
      },
    };
  }
  return cacheGroups;
};

module.exports = assembleCacheGroups;
