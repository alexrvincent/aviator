// The purpose of this file is to define hard limits on our performance budgets for this app. Consider this a configuration file that describes expected performance behavior of the app.
// Add and export your performance metrics here

module.exports = {
  bundleSize: {
    maxAssetSize: 10000, // in bytes
    maxEntrypointSize: 10000, // in bytes
  },
};
