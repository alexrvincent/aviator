/* 
  The purpose of this file is to describe to webpack how to run the client app on a local development server using webpack's dev server.

  Everything you see here is parsed, bundled, loaded and served by webpack exclusively and is for local development only!

  1. Starting at paths.appIndex.js (aka src/index.js) webpack will traverse the dependencies in an attempt to build all the files in the app. 
  2. It uses the module rules specified (and their supplied loaders) to figure out how to process a given file type.
  3. It resolves imports using the alias keys (so our Components/MyComponent) mean the same thing to humans and webpack.
  4. Then when it's finished resolving all the files, it uses HTMLWebpackPlugin and injects the fully formed app into client/public/templates/default.html.
  5. We turn on the "hot" module replacement and add a couple other webpack development server configurations to allow us to have a nice developer experience.
  6. The webpack development server then serves the app to the host/port we specify for us to develop against! Any changes to the app will reload automatically!

*/

const path = require('path');
const paths = require('../paths');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: 'eval-source-map',
  entry: paths.appIndexJs,
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
          // Creates `style` nodes from JS strings and injects them into the dev hot load module
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
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
      Services: path.resolve(__dirname, '../../src/services/'),
      test: path.resolve(__dirname, '../../src/test/'),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.appClientHtml,
    }),
  ],
  devServer: {
    static: paths.appClientPublic,
    compress: true,
    hot: true,
    host: 'localhost',
    port: 3000,
    devMiddleware: {
      publicPath: '/',
    },
    historyApiFallback: true,
  },
};
