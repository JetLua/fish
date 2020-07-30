const path = require('path')
const webpack = require('webpack')

const prod = process.argv.includes('-p')

module.exports = {
  entry: [
    '@iro/wechat-adapter',
    './src/app.js'
  ],

  output: {
    path: path.resolve('dist'),
    filename: 'game.js'
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

  plugins: [
    new webpack.ProvidePlugin({
      PIXI: 'pixi.js'
    })
  ],

  mode: prod ? 'production' : 'development'
}
