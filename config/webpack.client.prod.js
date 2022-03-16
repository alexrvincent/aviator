const paths = require('./paths');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// const ejs = require('ejs');
// const fs = require('fs');
// const path = require('path');

// function templateContentString(template = paths.appHtmlTemplateInput) {
//   const file = fs.readFileSync(template, 'utf-8'),
//     rendered = ejs.render(file, {
//       reactApp: '<%- reactApp %>',
//       head: '<%- head %>',
//     });
//   return rendered;
// }

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
        template: paths.appHtmlTemplateInput,
        filename: paths.appHtmlTemplateOutput,
        // templateContent: templateContentString(paths.appHtmlTemplateInput),
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
