const
  path = require('path'),
  webpack = require('webpack')

const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  entry: [
    '@iro/wechat-adapter',
    './src/app.js'
  ],

  output: {
    path: path.resolve('dist'),
    filename: 'game.js'
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

  plugins: [
    new webpack.ProvidePlugin({
      PIXI: 'pixi.js'
    })
  ],

  mode: isProd ? 'production' : 'development'
}