// vendor.js - houses the configuration of how this app code splits groups of node modules into smaller custom webpack chunks.

// If you have an npm module that only needs to be loaded on a certain conditions, please put it here to save the main vendor bundle size.
// If you have a module defined in the source code you'd like split out, please put it in config/codesplitting/module.js

module.exports = {
  /* 1. How to create a new simple custom vendor chunk (example)
    myCustomVendorChunkName: {
      libraries: ['npm-module-1', 'npm-module-2', ...],
    },
  */

  /* 1a. How to create a new custom vendor chunk (without a default export)
    myCustomVendorChunkName: {
      libraries: ['npm-module-without-default-export'],
      localModules: ['[\\/]src[\\/]modules[\\/]npm-module-without-default-export.*'],  <-- re-export it in your source code under src/modules
    }, 
  */

  // 2. Add new vendor chunks here
  // react: {
  //   libraries: ['react', 'react-dom'],
  // },

  // This must be last and be the only vendor without libraries (special case). Don't edit anything below here!
  vendor: {
    libraries: [],
  },
};
