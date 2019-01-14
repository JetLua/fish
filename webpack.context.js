const
  path = require('path'),
  webpack = require('webpack')

const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  entry: [
    './context/app.js'
  ],

  output: {
    path: path.resolve('dist/context'),
    filename: 'index.js'
  },

  devtool: isProd ? false : 'source-map',
  stats: 'errors-only',

  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.(vert|frag)$/,
        use: ['raw-loader']
      }
    ]
  },

  mode: isProd ? 'production' : 'development'
}