const path = require("path");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const { name, version } = require('./package');

module.exports = {
  entry: path.join(__dirname, '/src/index.ts'),
  output: {
    path: path.join(__dirname, '/lib/'),
    filename: `${name}-${version}.min.js`,
    library: "lib4web",
    libraryTarget: 'umd',
    umdNamedDefine: true,
    libraryExport: 'default',
    globalObject: 'this'
  },
  devtool: '#source-map',
  mode: 'production',
  externals: {
  },
  resolve: {
    extensions: [".ts", ".js", ".json"]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /(node_modules)/,
      },
      {
        test: /\.tsx?$/,
        include: /(src)/,
        use: [{
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
            experimentalWatchApi: true,
          },
        }],
      },
    ]
  },
  plugins: [
    new UglifyJsPlugin({
      parallel: true,
      uglifyOptions: {
        compress: {
          warnings: false
        },
        mangle: true
      },
      sourceMap: true
    }),
  ]
}