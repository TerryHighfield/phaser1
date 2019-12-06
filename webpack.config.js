const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, 'src/index.ts'),
  devtool: 'inline-source-map',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index_bundle.js'
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    compress: true,
    port: 9000
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Phaser App Practice',
      template: 'src/index.html',
      inject: true
    })
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        include: [path.resolve(__dirname, 'src')],
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    plugins: [
      new TsconfigPathsPlugin({
        configFile: './tsconfig.json'
      })
    ],
    extensions: ['.ts', '.tsx', '.js']
  }
};
