# ErrorBoundary

React error boundaries **must** be class components — this is a React limitation (no hook equivalent exists).

---

## Implementation

```tsx
// src/shared/components/ErrorBoundary.tsx

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;                 // Optional custom fallback UI
  onError?: (error: Error) => void;     // Optional callback for crash reporting
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null };

  // Called during render phase — updates state to show fallback UI
  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  // Called after render — use for side effects (logging, crash reporting)
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);

    // 🔌 Plug in your crash reporting here:
    // Sentry.captureException(error);
    // crashlytics().recordError(error);

    this.props.onError?.(error);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;

      return (
        <View style={styles.container}>
          <Text style={styles.emoji}>⚠️</Text>
          <Text style={styles.title}>Something went wrong</Text>
          <Text style={styles.message}>
            {this.state.error?.message || 'An unexpected error occurred'}
          </Text>
          <TouchableOpacity style={styles.button} onPress={this.handleReset}>
            <Text style={styles.buttonText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#fff',
  },
  emoji:      { fontSize: 48, marginBottom: 16 },
  title:      { fontSize: 20, fontWeight: '700', color: '#1a1a1a', marginBottom: 8 },
  message:    { fontSize: 14, color: '#666', textAlign: 'center', marginBottom: 24 },
  button:     { backgroundColor: '#2596be', paddingHorizontal: 24, paddingVertical: 12, borderRadius: 8 },
  buttonText: { color: '#fff', fontWeight: '600', fontSize: 16 },
});
```

---

## Usage

### 1. Wrap the Entire App (Global)

```tsx
// src/App.tsx
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ErrorBoundary } from '@/shared/components/ErrorBoundary';
import { AppRouter } from './router';

function App() {
  return (
    <ErrorBoundary>
      <SafeAreaProvider>
        <AppRouter />
      </SafeAreaProvider>
    </ErrorBoundary>
  );
}

export default App;
```

### 2. Wrap Individual Screens (Granular)

Prevents one crashing screen from killing the entire app:

```tsx
// Inside a tab navigator or stack screen
<ErrorBoundary fallback={<Text>This tab crashed. Tap another tab.</Text>}>
  <CusOrders />
</ErrorBoundary>
```

### 3. With Crash Reporting Callback

```tsx
<ErrorBoundary onError={(error) => Sentry.captureException(error)}>
  <App />
</ErrorBoundary>
```

---

## What It Catches vs. What It Doesn't

| ✅ Catches | ❌ Does NOT Catch |
|---|---|
| Errors during rendering | Errors in event handlers (`onPress`) |
| Errors in lifecycle methods | Errors in `async` functions |
| Errors in constructors | Errors in `setTimeout` / `setInterval` |
| Errors in child component tree | Errors in the ErrorBoundary itself |

For **event handler** and **async** errors, add a global handler in `index.js`:

```js
// index.js — add BEFORE AppRegistry.registerComponent
import { LogBox } from 'react-native';

// Global JS error handler
ErrorUtils.setGlobalHandler((error, isFatal) => {
  console.error('Global error:', error, 'Fatal:', isFatal);
  // Sentry.captureException(error);
});

// Global unhandled promise rejection handler
if (typeof global.addEventListener === 'function') {
  global.addEventListener('unhandledrejection', (event) => {
    console.warn('Unhandled promise rejection:', event.reason);
  });
}
```

---

## File Location

Per the [ARCHITECTURE.md](./ARCHITECTURE.md), this is a **shared** component:

```
src/shared/components/ErrorBoundary.tsx
```
