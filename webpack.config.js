const path = require("path");
const webpack = require("webpack");

module.exports = {
  devServer: {
    hot: true,
  },
  entry : "./frontend/src/index.js",
  output : {
    path: path.resolve(__dirname, "frontend/static/frontend"),
    filename: "[name].js",
  },
  resolve: {
    extensions: [".js", ".jsx"], // Add ".jsx" to the list of extensions
  },
  module: {
    rules: [
    {
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: {
        loader: "babel-loader",
        options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
      },
    },
  ],
},
  optimization: {
    minimize: true,
  },
  mode: "development",
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("development"),
      },
    }),
  ],
}
