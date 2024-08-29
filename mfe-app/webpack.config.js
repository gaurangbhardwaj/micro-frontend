const { ModuleFederationPlugin } = require("webpack").container;

module.exports = {
  entry: "./src/index.js", // Make sure this points to your main JavaScript file
  mode: "development",
  devServer: {
    port: 3003, // Port for mfe-app
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
      name: "mfeApp",
      filename: "remoteEntry.js",
      remotes: {
        mfeCommon: "mfeCommon@http://localhost:3001/remoteEntry.js",
      },
      exposes: {
        "./LoginPage": "./src/pages/LoginPage",
      },
      shared: {
        react: { singleton: true, eager: true },
        "react-dom": { singleton: true, eager: true },
      },
    }),
  ],
};
