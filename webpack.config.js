var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var htmlConfig = require('./app/config/html.json');

var config = {
  entry: {
    index: './app/app.js',
    vendor: ['three', 'cannon', './app/lib/ViveController', './app/lib/VRControls', './app/lib/VREffect', './app/lib/WebVR', './app/lib/OBJLoader', './app/lib/OrbitControls', './app/lib/GPUComputationRenderer']
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: '[name].js'
  },
  plugins: [
    new HtmlWebpackPlugin(htmlConfig),
    new CopyWebpackPlugin([
      { from: ['./app/core/models', './app/exampleGame/models'], to: './models' },
    ]),
      new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest'] // Specify the common bundle's name.
  }),
    new webpack.ProvidePlugin({
      THREE: "three"
  })
  ],
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
      { test: /(\.vert)|(\.frag)$/, exclude: /node_modules/, loader: 'raw-loader'}
    ]
  },
  devtool: "source-map",
  watch: true
};

module.exports = config;
