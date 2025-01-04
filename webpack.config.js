'use strict'

const path = require('path');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './src/js/main.js', // Изменил на './src/index.js'
  output: {
    filename: 'bundle.js', // Изменил на 'bundle.js'
    path: path.resolve(__dirname, 'dist'),
    clean: true
  },
  devServer: {
    static: path.resolve(__dirname, 'dist'),
    port: 3000,
    hot: true,
    open: true
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './src/index.html' }),
    new ESLintPlugin({
      extensions: ['js', 'jsx'],
      emitWarning: true,
    }),
  ],
  ignoreWarnings: [
      {
        module: /module2\.js\?[34]/,
      },
      {
        module: /[13]/,
        message: /homepage/,
      },
      /warning from compiler/,
      (warning) => true,
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
          test: /\.(scss)$/,
          use: [
            { loader: 'style-loader' },
            { loader: 'css-loader' },
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: [autoprefixer]
                }
              }
            },
            { loader: 'sass-loader' }
          ]
        }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.scss', '.css'],
  },
};