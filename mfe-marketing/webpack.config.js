const { ModuleFederationPlugin } = require("webpack").container;
const path = require("path");

module.exports = {
  entry: "./src/index.js", // Ensure this points to your main JavaScript file
  mode: "development",
  devServer: {
    port: 3002, // Port for mfe-marketing
  },
  output: {
    publicPath: "auto",
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
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "mfeMarketing",
      filename: "remoteEntry.js",
      exposes: {
        "./MarketingPage": "./src/pages/MarketingPage",
      },
      shared: {
        react: { singleton: true, eager: true },
        "react-dom": { singleton: true, eager: true },
      },
    }),
  ],
};
