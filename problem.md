You are an expert in React Native, Metro, and Webpack, specializing in universal apps (Web + Mobile) using a Bare React Native CLI setup (non-Expo).

Context

I am building a cross-platform React Native app targeting:

Android
iOS
Web (via react-native-web)
Stack:
React Native: 0.84.1
React: 19
Web Bundler: Webpack 5
Mobile Bundler: Metro
Package Manager: Bun

The project uses a shared codebase with separate entry points:

index.js → Mobile (Metro)
index.web.js → Web (Webpack)
Problem
Web build works perfectly.
Android build fails with:
White screen or
Invariant Violation: "tanStack" has not been registered
What I’ve Already Done
1. Babel Fix
Previously aliased react-native → react-native-web in babel.config.js
This broke Android (DOM components instead of native)
Fixed by removing that alias from Babel
2. Webpack Setup
Moved react-native-web alias to webpack.config.js (correct for web-only)
Added mocks/aliases for native modules:
react-native-config
react-native-linear-gradient
react-native-fast-image
3. Metro Issues
Emulator intermittently shows:
Cannot connect to Metro at 10.0.2.2:8081
What I Need

Provide a clear debugging checklist to fix the Android issue without breaking the Web build.

Specifically:
1. Babel Configuration
How should babel.config.js be structured to:
Support shared aliases (e.g., @/)
Avoid platform-specific overrides (like react-native-web)
Work cleanly with both Metro and Webpack?
2. Android Native Setup (RN 0.84+)
Required setup for:
MainActivity
MainApplication
Any required configuration for:
react-native-screens
Fabric / New Architecture (if relevant)
3. Metro Caching Issues
How to ensure Metro does NOT reuse Web-specific transformations when switching platforms?
Proper cache reset strategy?
4. Full Environment Reset

Provide a reliable command sequence to fully reset:

Metro cache
Gradle build
Android app state
Port forwarding (ADB)
Goal

Fix the "App not registered" / white screen issue on Android, while maintaining a clean separation between:

Metro (native)
Webpack (web)
