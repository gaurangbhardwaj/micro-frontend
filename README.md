# Exploring Micro Frontends with Webpack 5 Module Federation

## What Is Webpack 5 Module Federation?

Webpack 5 introduced Module Federation, a feature designed to support the development of micro frontend architectures. Module Federation enables a JavaScript application to dynamically load code from another application at runtime. This allows you to build applications with modules that can be shared or consumed across different projects.

## Setting Up the Example

We'll use Webpack 5's Module Federation in this example to create a micro frontend architecture. Here's a step-by-step guide on how to set up a basic micro frontend project.

![Screenshot 2024-09-14 004601](https://github.com/user-attachments/assets/793e63d1-e110-4ac2-9df5-7f1a9aedbf02)

![Screenshot 2024-09-14 004212](https://github.com/user-attachments/assets/45359fec-e974-45c4-9b94-4df743b0b881)


### Project Structure

The project consists of three main parts:

- **mfe-shell (conatiner app)**: The main application that hosts micro frontends.
- **mfe-common**: Micro frontend that will contain common components to be used in other micro frontend apps.
- **mfe-app**: Micro frontend that will contain all the app pages like login etc (can use mfe-common components).
- **mfe-marketing**: Micro frontend that will contain your static marketing pages (can use mfe-common components).

### 1. Setting Up Webpack Configuration

#### Container App

In the `shell-app` folder, create a `webpack.config.js` file:

```javascript
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: 'http://localhost:3000/'
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'container_app',
      remotes: {
        app1: 'app1@http://localhost:3001/remoteEntry.js',
        app2: 'app2@http://localhost:3002/remoteEntry.js'
      },
      shared: ['react', 'react-dom']
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }
    ]
  },
  devServer: {
    port: 3000
  }
};
