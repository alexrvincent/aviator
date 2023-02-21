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
const paths = require('../paths');
const assembleCacheGroups = require('../codespliting');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const zlib = require('zlib');

module.exports = (env) => {
  const webpackClientProd = {
    target: 'web',
    mode: 'production',
    entry: {
      core: paths.appIndexJs,
      // Clean this up! Figure out where core items are specified.
    },
    output: {
      path: paths.appDist,
      filename: 'static/js/[name].[contenthash:8].js',
      chunkFilename: 'static/js/[name].[contenthash:8].js',
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
        {
          test: /\.svg$/i,
          use: ['@svgr/webpack'],
        },
      ],
    },
    plugins: [
      new CompressionPlugin({
        filename: '[path][base].gz',
        algorithm: 'gzip',
        threshold: 10240,
        minRatio: 0.8,
      }),
      new CompressionPlugin({
        filename: '[path][base].br',
        algorithm: 'brotliCompress',
        compressionOptions: {
          params: {
            [zlib.constants.BROTLI_PARAM_QUALITY]: 11,
          },
        },
        threshold: 10240,
        minRatio: 0.8,
      }),
      new MiniCssExtractPlugin({
        filename: 'static/css/[name].[contenthash:8].css',
        chunkFilename: 'static/css/[name].[contenthash:8].css',
      }),
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
      new ForkTsCheckerWebpackPlugin(),
    ],
    optimization: {
      splitChunks: {
        // chunks: 'all',
        cacheGroups: {
          ...assembleCacheGroups(),
        },
      },
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            format: {
              comments: false,
            },
          },
          extractComments: false,
        }),
        new CssMinimizerPlugin({
          parallel: true,
          minimizerOptions: {
            preset: [
              'default',
              {
                discardComments: { removeAll: true },
              },
            ],
          },
        }),
      ],
    },
    resolve: {
      modules: ['src', 'node_modules'],
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
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
        // Webpack tree-shakes redux out because it's not used explicitly
        // in our main bundle. Redux-toolkit uses it as a dependency, so we'll need
        // to alias it for the production bundle
        // redux: require.resolve('redux'),
      },
    },
    stats: {
      colors: true,
      modules: true,
      reasons: true,
      errorDetails: true,
    },
  };

  // Modify the config dynamically by checking --env arguments here
  if (env.analyze) {
    webpackClientProd.plugins.push(new BundleAnalyzerPlugin());
  }

  return webpackClientProd;
};
