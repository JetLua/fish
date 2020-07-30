const path = require('path')
const webpack = require('webpack')

const prod = process.argv.includes('-p')

module.exports = {
  entry: [
    './context/app.js'
  ],

  output: {
    path: path.resolve('dist/context'),
    filename: 'index.js'
  },

  devtool: prod ? false : 'source-map',
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

  mode: prod ? 'production' : 'development'
}
