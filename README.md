# Exploring Micro Frontends with Webpack 5 Module Federation

Micro frontends are a powerful architectural approach that allows developers to break up a large monolithic frontend application into smaller, more manageable pieces. This modular approach enables independent development, testing, and deployment of various parts of the application. In this guide, we'll explore how to implement micro frontends using Webpack 5's Module Federation. We'll walk through a practical example with code from my GitHub repository: [micro-frontend](https://github.com/gaurangbhardwaj/micro-frontend).

## What Are Micro Frontends?

Micro frontends extend the concept of microservices to the frontend world. Instead of having a single large frontend application, micro frontends allow developers to split the frontend into smaller, more manageable modules. Each module is a self-contained unit that can be developed, tested, and deployed independently.

## What Is Webpack 5 Module Federation?

Webpack 5 introduced Module Federation, a feature designed to support the development of micro frontend architectures. Module Federation enables a JavaScript application to dynamically load code from another application at runtime. This allows you to build applications with modules that can be shared or consumed across different projects.

## Setting Up the Example

In this example, we'll use Webpack 5's Module Federation to create a micro frontend architecture. Here's a step-by-step guide on how to set up a basic micro frontend project. The example code is available on [GitHub](https://github.com/gaurangbhardwaj/micro-frontend).

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
