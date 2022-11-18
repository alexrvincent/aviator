/* 
  The purpose of this file is to describe to webpack how to build a production-level static application (just html, css and js!) using your local files.

  Everything you see here is parsed, bundled, and exported by webpack. It does *not* run a web server, so the result of this will be files, not a process!

  1. Starting at paths.appIndex.js (aka src/index.js) webpack will traverse the dependencies in an attempt to build all the files in the app. 
  2. We specify paths.appDist (dist/) as the place we'll put the files we build and give it a name and chunk name to easily identify it.
  3. Similar to our client.dev.js config, it uses the module rules specified (and their supplied loaders) to figure out how to process a given file type.
  4. Similar to our client.dev.js it resolves imports using the alias keys (so our Components/MyComponent) mean the same thing to humans and webpack.
  5. Then when it's finished resolving all the files, it uses HTMLWebpackPlugin and injects the fully formed app into client/public/templates/default.html and puts that in dist/index.html
  6. We also add configuration to HTMLWebpackPlugin to minify all our code and use MiniCssExtractPluin/ForkTsCheckerWebpackPlugin to minify and clean our code.
  7. Finally we add some optimizations to split our our vendor code (node_modules and external node) from our main app.
  8. The result of this is some html, css, and js sitting in our dist/ folder ready to be served as a static app!

*/

const path = require('path');
const paths = require('./paths');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = (env) => {
  const webpackClientProd = {
    mode: 'production',
    devtool: 'source-map',
    entry: paths.appIndexJs,
    output: {
      path: paths.appDist,
      filename: 'static/js/[name].[contenthash:8].js',
      chunkFilename: 'static/js/[name].[contenthash:8].chunk.js',
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
              loader: MiniCssExtractPlugin.loader,
            },
            { loader: 'css-loader' },
            { loader: 'sass-loader' },
          ],
          sideEffects: true,
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        inject: true,
        template: paths.appClientHtmlTemplateInput,
        filename: paths.appClientHtmlTemplateOutput,
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeStyleLinkTypeAttributes: true,
          keepClosingSlash: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true,
        },
      }),
      new MiniCssExtractPlugin({
        filename: 'static/css/[name].[contenthash:8].css',
        chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
      }),
      new ForkTsCheckerWebpackPlugin(),
    ],
    optimization: {
      splitChunks: {
        cacheGroups: {
          commons: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendor',
            chunks: 'all',
          },
          manifest: {
            name: 'manifest',
          },
        },
      },
    },
    resolve: {
      modules: ['src', 'node_modules'],
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
      alias: {
        Components: path.resolve(__dirname, '../src/components/'),
        css: path.resolve(__dirname, '../src/css/'),
        util: path.resolve(__dirname, '../util'),
        Routes: path.resolve(__dirname, '../src/routes/'),
        // Webpack tree-shakes redux out because it's not used explicitly
        // in our main bundle. Redux-toolkit uses it as a dependency, so we'll need
        // to alias it for the production bundle
        // redux: require.resolve('redux'),
      },
    },
  };

  // Modify the config dynamically by checking --env arguments here
  if (env.analyze) {
    webpackClientProd.plugins.push(new BundleAnalyzerPlugin());
  }

  return webpackClientProd;
};
