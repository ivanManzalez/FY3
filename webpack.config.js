const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry : "./frontend/src/index.js",
  output : {
    path: path.resolve(__dirname, "frontend/static/frontend"),
    filename: "[name].js",
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
