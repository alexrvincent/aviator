/* 
  The purpose of this file is to describe to webpack how to build a development version of your application that runs on a node server using express. 

  Everything you see here is parsed, bundled, and exported by webpack, but is served using an express.js server using parameters we specify. The result of this is to build *and* run a development web server.

  1. Starting at paths.appServer (server/index.js) webpack will traverse the dependencies in an attempt to build all the files in the app. 
  2. It uses the module rules specified (and their supplied loaders) to figure out how to process a given file type.
  3. It resolves imports using the alias keys (so our Components/MyComponent) mean the same thing to humans and webpack.
  4. Then when it's finished resolving all the files, it uses HTMLWebpackPlugin and injects the fully formed app into server/public/templates/default.html.
  5. Finally, it creates dist/server.js and runs / watches any changes made to that file, reloading if there are any.
  6. dist/server.js will translate http requests to a fully rendered react apps on the server. It uses the code built in steps 1-4 to do this! See server/index.js for more.

*/

const path = require('path');
const paths = require('./paths');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  target: 'node',
  cache: false,
  devtool: 'eval-source-map',
  entry: paths.appServer,
  output: {
    path: path.join(__dirname, '../', 'dist'),
    filename: 'server.js',
    publicPath: '/',
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
          // We use isomorphic-style-loader to run on node.js because style-loader requires 'document' a browser exclusive item
          // Creates `style` nodes from JS strings
          'isomorphic-style-loader',
          {
            // Translates CSS into CommonJS
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              sourceMap: true,
            },
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
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
    alias: {
      Components: path.resolve(__dirname, '../src/components/'),
      Hooks: path.resolve(__dirname, '../src/hooks/'),
      css: path.resolve(__dirname, '../src/css/'),
      util: path.resolve(__dirname, '../util'),
      Routes: path.resolve(__dirname, '../src/routes/'),
    },
  },
  plugins: [new webpack.HotModuleReplacementPlugin(), new webpack.LoaderOptionsPlugin({ debug: true })],
  watchOptions: {
    aggregateTimeout: 200,
    poll: 1000,
  },
};
