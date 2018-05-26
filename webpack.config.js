const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './src',

  module: {
    rules: [{ test: /\.ts$/, loader: 'ts-loader' }],
  },

  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './dist'),
  },

  resolve: {
    extensions: ['.ts'],
  },
};
