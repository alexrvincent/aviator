/* 
  The purpose of this file is to describe to webpack how to build a production version of your application that runs on a node server using express. 

  Everything you see here is parsed, bundled, and exported by webpack, but is served using an express.js server using parameters we specify. The result of this is to build *and* run a production web server.

  1. Starting at paths.appServer (server/index.js) webpack will traverse the dependencies in an attempt to build all the files in the app. 
  2. It uses the module rules specified (and their supplied loaders) to figure out how to process a given file type.
  3. It resolves imports using the alias keys (so our Components/MyComponent) mean the same thing to humans and webpack.
  4. Then when it's finished resolving all the files, it uses HTMLWebpackPlugin and injects the fully formed app into server/public/templates/default.html.
  5. Finally, it creates dist/server.js and runs / watches any changes made to that file, reloading if there are any.
  6. dist/server.js will translate http requests to a fully rendered react apps on the server. It uses the code built in steps 1-4 to do this! See server/index.js for more.

*/

const path = require('path');
const paths = require('../paths');
const webpack = require('webpack');

module.exports = {
  mode: 'production',
  target: 'node',
  cache: false,
  entry: paths.appServer,
  output: {
    path: paths.appDist,
    filename: 'server.js',
  },
  externals: {
    express: 'require("express")',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: 'ts-loader',
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          {
            // Translates CSS into CommonJS
            loader: 'css-loader',
          },
          {
            // Compiles Sass to CSS
            loader: 'sass-loader',
          },
        ],
        sideEffects: true,
      },
      {
        test: /\.svg$/i,
        use: ['@svgr/webpack'],
      },
    ],
  },
  resolve: {
    modules: ['src', 'node_modules'],
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
    alias: {
      App: path.resolve(__dirname, '../../src/app/'),
      Assets: path.resolve(__dirname, '../../src/assets/'),
      Core: path.resolve(__dirname, '../../src/core/'),
      Components: path.resolve(__dirname, '../../src/components/'),
      Contexts: path.resolve(__dirname, '../../src/contexts/'),
      Features: path.resolve(__dirname, '../../src/features/'),
      Hooks: path.resolve(__dirname, '../../src/hooks/'),
      css: path.resolve(__dirname, '../../src/css/'),
      utils: path.resolve(__dirname, '../../src/utils'),
      Routes: path.resolve(__dirname, '../../src/routes/'),
    },
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),
  ],
};
