const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = {
  plugins: [
    new HtmlWebpackPlugin({
      title: 'ShrinktIt',
      template: path.resolve(__dirname, '../src', 'index.html'),
      hash: true,
    }),
  ],
}
