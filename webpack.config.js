var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var webpack = require('webpack')

const faker = require('faker')
const _ = require('lodash')


module.exports = {
  entry: ['babel-polyfill', './src/index.js'],

  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },

  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] }
    ]
  },

  devtool: 'cheap-eval-source-map',

  devServer: {
    hot: true,
    contentBase: path.resolve(__dirname, 'dist'),
    publicPath: '',
    setup: (app) => {
      const names = _.times(500000, () => faker.name.findName());
      app.get('/names', (req, res) => {
        const {from, to} = req.query;
        setTimeout(() => (res.status(200).json(names.slice(parseInt(from) - 1, parseInt(to) - 1))), 1000)
      })
    }
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.ejs',
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
};
