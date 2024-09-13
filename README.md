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


## Setting Up Micro Frontends with Webpack 5

## 1. Basic Configuration
In the `mfe-shell`, `*mfe-common`, `mfe-app` and `mfe-marketing` folders you will find `webpack.config.js` file, which contains your basic Webpack module federation config:

## Host Application (container) Webpack Configuration (mfe-shell):
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
```

## Remote Micro Frontend Webpack Configuration (mfe-common, mfe-app and mfe-marketing):
```javascript
// webpack.config.js
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    publicPath: 'auto',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'microFrontend',
      filename: 'remoteEntry.js',
      exposes: {
        './Button': './src/Button',
      },
      shared: ['react', 'react-dom'],
    }),
  ],
};

```

## 2. Building and Loading Micro Frontends
With the above configurations, the `hostApp` will dynamically load modules from `microFrontend` at runtime. When the host application requires the Button component, it will fetch it from the remote micro frontend’s `remoteEntry.js`.

```javascript
// src/index.js in hostApp
import React from 'react';
import ReactDOM from 'react-dom';

const Button = React.lazy(() => import('microFrontend/Button'));

function App() {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <Button />
    </React.Suspense>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
```

## Best Practices
1. Version Management: Ensure compatibility between shared libraries by managing versions effectively.
2. Performance: Monitor and optimize loading times of remote components to maintain performance.
3. Isolation: Maintain clear boundaries between micro frontends to avoid unintentional dependencies.


