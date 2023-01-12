// The purpose of this file is to define hard limits on our performance budgets for this app. Consider this a configuration file that describes expected performance behavior of the app.
// Add and export your performance metrics here

module.exports = {
  budgets: {
    assets: [
      {
        assetPath: `static/js/app.*.js.br`,
        maxSize: 4000,
      },
      {
        assetPath: `static/js/vendor.*.js.br`,
        maxSize: 60000,
      },
      {
        assetPath: `static/css/app.*.css`,
        maxSize: 6000,
      },
    ],
  },
};
