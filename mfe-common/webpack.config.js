const { ModuleFederationPlugin } = require("webpack").container;
const path = require("path");

module.exports = {
  entry: "./src/index.js",
  mode: "development",
  devServer: {
    port: 3001, // Adjust the port as needed
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
      name: "mfeCommon",
      filename: "remoteEntry.js",
      exposes: {
        "./Button": "./src/components/Button",
        "./Input": "./src/components/Input",
        "./Textarea": "./src/components/Textarea",
      },
      shared: {
        react: { singleton: true, eager: true },
        "react-dom": { singleton: true, eager: true },
      },
    }),
  ],
};
