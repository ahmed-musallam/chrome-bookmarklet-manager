const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin');



const distPath = '../ext/options/app'

module.exports = {
  mode: 'production',
  entry: {
    "app": './index.js',
    "editor.worker": 'monaco-editor/esm/vs/editor/editor.worker.js',
    "json.worker": 'monaco-editor/esm/vs/language/json/json.worker',
    "css.worker": 'monaco-editor/esm/vs/language/css/css.worker',
    "html.worker": 'monaco-editor/esm/vs/language/html/html.worker',
    "ts.worker": 'monaco-editor/esm/vs/language/typescript/ts.worker',
  },
  optimization: {
    minimize: false
  },
  output: {
    globalObject: 'self',
    filename: '[name].js',
    publicPath: "app/",
    path: path.resolve(__dirname, distPath)
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    }, {
      test: /\.js$/,
      exclude: /node_modules/,
      use: 'babel-loader'
    }]
  },
  plugins: [
    new CleanWebpackPlugin([distPath], {allowExternal: true}),
  ]
};