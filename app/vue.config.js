module.exports = {
  baseUrl: "./app/",
  outputDir: "../ext/options/app",
  configureWebpack: {
    // Chrome extensions do not support `eval` thus we chose an appropriate devtool
    // see: https://webpack.js.org/configuration/devtool/
    devtool: process.env.NODE_ENV == "development" ? 'cheap-source-map' : false,
    output: {
      globalObject: 'self',
      filename: '[name].js'
    },
    entry: {
      "editor.worker": 'monaco-editor/esm/vs/editor/editor.worker.js',
      "json.worker": 'monaco-editor/esm/vs/language/json/json.worker',
      "css.worker": 'monaco-editor/esm/vs/language/css/css.worker',
      "html.worker": 'monaco-editor/esm/vs/language/html/html.worker',
      "ts.worker": 'monaco-editor/esm/vs/language/typescript/ts.worker',
    },
  }
}