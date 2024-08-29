const { ModuleFederationPlugin } = require("webpack").container;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require("path");

module.exports = {
  entry: "./src/index.js", // Ensure this points to your main JavaScript file
  mode: "development",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "/",
  },
  devServer: {
    port: 3000, // Port for mfe-shell
    historyApiFallback: true,
  },
  resolve: {
    extensions: [".js", ".jsx"], // Resolve JS and JSX extensions
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/, // Handle JavaScript and JSX files
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/, // Handle CSS files
        use: [
          "style-loader", // Injects CSS into the DOM
          "css-loader", // Resolves CSS imports
        ],
      },
      {
        test: /\.(ico|png|jpg|jpeg|gif)$/,
        loader: "file-loader",
        options: {
          name: "[name].[ext]",
          outputPath: "assets/",
          publicPath: "assets/",
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new ModuleFederationPlugin({
      name: "mfeShell",
      remotes: {
        mfeMarketing: "mfeMarketing@http://localhost:3002/remoteEntry.js",
        mfeApp: "mfeApp@http://localhost:3003/remoteEntry.js",
      },
      shared: {
        react: { singleton: true, eager: true },
        "react-dom": { singleton: true, eager: true },
      },
    }),
  ],
};
