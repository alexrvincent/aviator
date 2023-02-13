// codesplitting/module.js - houses the configuration of how this app code splits JavaScript modules into smaller custom webpack chunks.

// If you have source code (like a Component or Route) that only needs to be loaded on a certain conditions, please put it here to save the main JavaScript bundle size.
// If you have an vendor (npm) module you'd like split out, please put it in config/codesplitting/vendor.js

module.exports = {
  // mealPlanning: {
  //   test: /[\\/]src[\\/]bundles[\\/]mealPlanning/,
  //   name: 'mealPlanning',
  // },
};
