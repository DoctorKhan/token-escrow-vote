const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const postcssCssnext = require('postcss-cssnext')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const env = process.env.NODE_ENV || 'prod'
const CopyWebpackPlugin = require('copy-webpack-plugin');

function plugins() {
/*
  if(env === 'prod'){
    return [
      // new ExtractTextPlugin('style.css', { allChunks: true }),
      new webpack.optimize.DedupePlugin(),
      new webpack.DefinePlugin({ 'process.env':{ 'NODE_ENV': JSON.stringify('production')} }),
      new webpack.optimize.UglifyJsPlugin({ minimize: true, compress: { warnings: false } }),
      //new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),
    ]
  }
*/
  return [
    // new ExtractTextPlugin('style.css', { allChunks: true }),
    // Copy our app's index.html to the build folder.
    new CopyWebpackPlugin([
      { from: './app/index.html', to: "index.html" }
    ])
  ]
}

function loaders() {
  return [
    {
      test: /\.js$/,
      loader: 'babel-loader', exclude: /node_modules/,        
      query: {
        presets: [ 'babel-preset-react'
                 , 'babel-preset-es2015'
                 , "babel-preset-stage-0"
                 ].map(require.resolve),
        plugins: [ 'babel-plugin-react-html-attrs'
                 , 'babel-plugin-transform-class-properties'
                 , 'babel-plugin-transform-runtime'
                 , "babel-plugin-transform-decorators-legacy"
                 ].map(require.resolve)
      }
    },
    {
      test: /\.css$/,
      use: [ 'style-loader', 'css-loader' ]
    }
  ]
}

function entry() {
  return { app: './app/javascripts/controller.js'}
}

function output() {
  return {
    path: path.resolve(__dirname, 'build'),
    filename: 'blockchainApp.js'
  }
}

var devtool = 'inline-source-map'

if(env === 'prod'){ devtool = 'hidden-sourcemap' }

/* config */
module.exports = {
  devtool: devtool,
  entry: entry(),
  output: output(),
  module: { loaders: loaders() },
  devServer: { historyApiFallback: true },
  plugins: plugins()
}

