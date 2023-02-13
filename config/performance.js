// The purpose of this file is to define hard limits on our performance budgets for this app. Consider this a configuration file that describes expected performance behavior of the app.
// Add and export your performance metrics here

// Top Performance Budgeting Metrics
// 1. Time Based - (Core Web Vitals such as: Time to Interactive, Largest Contentful Paint, First Input Delay, Cumulative Layout Shift)
// 2. Quantity Based - (Bundle Sizes such as: JS files, css files, image files sent to client)
// 3. Rule based - (PageSpeed Index, Lighthouse Score)

module.exports = {
  budgets: {
    assets: [
      {
        assetPath: `static/js/app.*.js`,
        maxSize: 13000,
      },
      {
        assetPath: `static/js/app.*.js.gz`,
        maxSize: 5000,
      },
      {
        assetPath: `static/js/app.*.js.br`,
        maxSize: 4000,
      },
      {
        assetPath: `static/js/vendor.*.js`,
        maxSize: 220000,
      },
      {
        assetPath: `static/js/vendor.*.js.gz`,
        maxSize: 70000,
      },
      {
        assetPath: `static/js/vendor.*.js.br`,
        maxSize: 60000,
      },
      {
        assetPath: `static/css/app.*.css`,
        maxSize: 6000,
      },
      {
        assetPath: `static/css/core.*.css`,
        maxSize: 6000,
      },
    ],
  },
};
