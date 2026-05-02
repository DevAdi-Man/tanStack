# 🌐 React Native Web Setup & Changes

This document summarizes the changes and configurations implemented to support **React Native Web** alongside Android and iOS in this project.

---

## 🚀 Overview
The project uses a universal codebase with **Metro** for mobile (Android/iOS) and **Webpack 5** for the Web. We have maintained a clean separation to ensure that web-specific configurations do not break the native builds.

---

## 📦 1. Dependencies Added

The following packages were added to support the web build:

### Core Web Dependencies
- `react-native-web`: The core library for running React Native on the web.
- `react-dom`: Required by `react-native-web` for rendering to the DOM.
- `webpack`, `webpack-cli`, `webpack-dev-server`: For bundling and serving the web app.
- `html-webpack-plugin`: To generate the `index.html`.
- `babel-loader`: To transpile React Native code for the browser.

### Web-Compatible Shims
- `react-native-web-linear-gradient`: A web implementation of `react-native-linear-gradient`.
- `@types/react-native-web`: TypeScript definitions.

---

## ⚙️ 2. Webpack Configuration (`webpack.config.js`)

A dedicated `webpack.config.js` was created to handle the web build. Key features include:

### Aliases
We use aliases to swap native-only modules with web-compatible versions or mocks:
```javascript
alias: {
    'react-native$': 'react-native-web',
    'react-native-reanimated': false, // Disabled if not needed on web
    '@d11/react-native-fast-image': 'react-native-web/dist/exports/Image', // Use standard Image
    'react-native-linear-gradient': 'react-native-web-linear-gradient',
    'react-native-config': path.resolve(appDirectory, 'react-native-config.web.js'),
    '@': path.resolve(appDirectory, 'src'), // Shared alias
}
```

### Module Transpilation
Many React Native libraries are distributed as un-transpiled ES6 code. We include them in the `babel-loader`'s `include` array:
- `@react-navigation/*`
- `react-native-gesture-handler`
- `react-native-safe-area-context`
- `react-native-screens`
- `react-native-config`

### Platform Extensions
Webpack is configured to prioritize `.web.js`, `.web.tsx`, etc., allowing for platform-specific files:
```javascript
extensions: ['.web.js', '.js', '.web.tsx', '.web.ts', '.tsx', '.ts', '.jsx'],
```

---

## 🛠️ 3. Babel Configuration (`babel.config.js`)

To avoid breaking Android/iOS builds, we **removed** `react-native-web` aliases from `babel.config.js`. 
- **Metro** uses `babel.config.js` directly.
- **Webpack** uses `babel-loader` with specific options that include the `react-native-web` plugin.

---

## 🏁 4. Entry Points

We separated the entry points for Mobile and Web to handle platform-specific registration:

- **Mobile (`index.native.js`)**:
  Standard `AppRegistry.registerComponent`.
- **Web (`src/index.js`)**:
  Includes `AppRegistry.runApplication` to mount the app into the DOM:
  ```javascript
  AppRegistry.runApplication(appName.name, {
    initialProps: {},
    rootTag: document.getElementById('root'),
  });
  ```

---

## 📝 5. Mocking Native Modules

### React Native Config
Since `react-native-config` reads from `.env` files using native code, we created `react-native-config.web.js` to provide environment variables on the web:
```javascript
const Config = {
  // Add environment variables here
};
export default Config;
```

---

## 🖼️ 6. SVG Support
We use `react-native-svg` for both mobile and web.
- **Mobile**: Configured via `metro.config.js` and `react-native-svg-transformer`.
- **Web**: Handled by Webpack's asset modules.

---

## 🏃 7. Available Scripts

Updated `package.json` with web-specific commands:

- `bun run web`: Starts the Webpack dev server.
- `bun run build:web`: Builds the production-ready web bundle in the `dist/` folder.

---

## ⚠️ 8. Key Fixes & Troubleshooting

- **White Screen on Android**: Fixed by ensuring `react-native-web` is NOT aliased in `babel.config.js`, as it was causing Metro to transpile native components into web components.
- **Invariant Violation**: Fixed by ensuring the application name in `app.json` matches the one used in `AppRegistry`.
- **React Navigation errors**: Fixed by setting `fullySpecified: false` in Webpack's `resolve` to handle ESM module resolution.
