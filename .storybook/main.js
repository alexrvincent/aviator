const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/preset-scss',
    'storybook-dark-mode',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: '@storybook/react',
  core: {
    builder: '@storybook/builder-webpack5',
  },
  webpackFinal: async (config) => {
    // 👈 and add this here
    config.resolve.plugins = [new TsconfigPathsPlugin()];
    config.resolve.alias = {
      ...config.resolve.alias,
      Hooks: path.resolve(__dirname, '../src/hooks/'),
      'util/index': path.resolve(__dirname, '../src/util/index.js'),
    };
    return config;
  },
};
