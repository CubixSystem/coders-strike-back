import path from 'path';
import { Configuration } from 'webpack';
import TerserPlugin from 'terser-webpack-plugin';

export default (_env: any, argv: any): Configuration => ({
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
  optimization: {
    minimize: argv.mode === 'production',
    minimizer: [
      new TerserPlugin({
        // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
        terserOptions: {
          mangle: {
            properties: true,
          },
        },
      }),
    ],
  },
});
