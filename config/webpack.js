var webpack = require('webpack');
var path    = require('path');

var APP_ROOT = path.join(__dirname, '..');

var babel = {
  presets: ['react', 'es2015', 'stage-0']
};

module.exports = {
  devtool: 'source-map',

  entry: {
    index: [
      'webpack-dev-server/client?http://0.0.0.0:8080',
      'webpack/hot/only-dev-server',
      'babel-polyfill',
      path.join(APP_ROOT, "/ui/index.js")
    ]
  },

  output: {
    path:     path.join(APP_ROOT, 'public'),
    filename: '[name].js',
    sourceMapFilename: '[file].map'
  },

  resolve: {
    extensions: [ '', '.js', '.jsx']
  },

  module: {
    loaders: [
      { test: /\.json$/, loader: 'json-loader' },
      { test: /\.less$/, loader: 'style!css!less' },
      { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'file' },
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loaders: ['react-hot', 'babel?' + JSON.stringify(babel)],
       }
    ]
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js')
  ]
};
