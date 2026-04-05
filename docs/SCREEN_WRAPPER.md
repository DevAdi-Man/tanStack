# ScreenWrapper

A layout component that wraps every screen with consistent safe area handling, background color, padding, and optional keyboard avoidance.

---

## Implementation

```tsx
// src/shared/components/layout/ScreenWrapper.tsx

import React, { ReactNode } from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ViewStyle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '@/theme';

interface ScreenWrapperProps {
  children: ReactNode;
  backgroundColor?: string;         // Override background color
  scrollable?: boolean;             // Wrap content in ScrollView
  keyboardAvoiding?: boolean;       // Enable KeyboardAvoidingView (for forms)
  padding?: number;                 // Override horizontal padding
  statusBarStyle?: 'light-content' | 'dark-content';
  statusBarColor?: string;          // Android status bar bg color
  edges?: ('top' | 'bottom')[];     // Which safe area edges to respect
  style?: ViewStyle;                // Additional style override
}

export const ScreenWrapper = ({
  children,
  backgroundColor = colors.background,
  scrollable = false,
  keyboardAvoiding = false,
  padding = 16,
  statusBarStyle = 'dark-content',
  statusBarColor = colors.background,
  edges = ['top'],
  style,
}: ScreenWrapperProps) => {
  const insets = useSafeAreaInsets();

  const containerStyle: ViewStyle = {
    flex: 1,
    backgroundColor,
    paddingTop: edges.includes('top') ? insets.top : 0,
    paddingBottom: edges.includes('bottom') ? insets.bottom : 0,
  };

  const contentStyle: ViewStyle = {
    flex: 1,
    paddingHorizontal: padding,
  };

  const content = scrollable ? (
    <ScrollView
      style={contentStyle}
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled">
      {children}
    </ScrollView>
  ) : (
    <View style={[contentStyle, style]}>{children}</View>
  );

  return (
    <View style={containerStyle}>
      <StatusBar
        barStyle={statusBarStyle}
        backgroundColor={statusBarColor}
        translucent={false}
      />
      {keyboardAvoiding ? (
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}>
          {content}
        </KeyboardAvoidingView>
      ) : (
        content
      )}
    </View>
  );
};
```

---

## Usage Examples

### 1. Basic Screen (Most Common)

```tsx
import { ScreenWrapper } from '@/shared/components/layout';
import { AppHeader, AppText } from '@/shared/components/ui';

export const CusHome = () => {
  return (
    <ScreenWrapper>
      <AppHeader title="Home" />
      <AppText>Welcome back!</AppText>
    </ScreenWrapper>
  );
};
```

### 2. Scrollable Screen (Long Content)

```tsx
export const CusOrders = () => {
  return (
    <ScreenWrapper scrollable>
      <AppHeader title="Orders" />
      {/* Long list of content */}
    </ScreenWrapper>
  );
};
```

### 3. Form Screen (Keyboard Avoidance)

```tsx
export const LoginScreen = () => {
  return (
    <ScreenWrapper keyboardAvoiding scrollable statusBarStyle="light-content">
      <AppHeader title="Login" />
      <AppInput placeholder="Email" />
      <AppInput placeholder="Password" secureTextEntry />
      <AppButton title="Sign In" onPress={handleLogin} />
    </ScreenWrapper>
  );
};
```

### 4. Custom Background + No Top Safe Area

```tsx
export const SalesHome = () => {
  return (
    <ScreenWrapper
      backgroundColor="#1a1a2e"
      statusBarStyle="light-content"
      statusBarColor="#1a1a2e"
      edges={['bottom']}>         {/* No top padding — custom header goes edge-to-edge */}
      <CustomGradientHeader />
      <DashboardContent />
    </ScreenWrapper>
  );
};
```

### 5. With Extra Padding Override

```tsx
<ScreenWrapper padding={24}>
  {/* More breathing room */}
</ScreenWrapper>
```

---

## Props Reference

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | `ReactNode` | — | Screen content |
| `backgroundColor` | `string` | `colors.background` | Background color for the screen |
| `scrollable` | `boolean` | `false` | Wraps content in `ScrollView` |
| `keyboardAvoiding` | `boolean` | `false` | Wraps in `KeyboardAvoidingView` (use for forms) |
| `padding` | `number` | `16` | Horizontal padding |
| `statusBarStyle` | `'light-content' \| 'dark-content'` | `'dark-content'` | Status bar text color |
| `statusBarColor` | `string` | `colors.background` | Android status bar background |
| `edges` | `('top' \| 'bottom')[]` | `['top']` | Which safe area insets to apply |
| `style` | `ViewStyle` | — | Extra style applied to content container |

---

## Why Use ScreenWrapper

| Without | With |
|---|---|
| Repeat `SafeAreaView` in every screen | Handled automatically via `useSafeAreaInsets` |
| Inconsistent padding across screens | One `padding` prop, default 16 |
| Forget `StatusBar` config on some screens | Always set, per-screen override via props |
| Add `KeyboardAvoidingView` ad-hoc per form | Just pass `keyboardAvoiding` prop |
| Mix `ScrollView` wrapping patterns | Just pass `scrollable` prop |

---

## File Location

Per the [ARCHITECTURE.md](./ARCHITECTURE.md):

```
src/shared/components/layout/ScreenWrapper.tsx
```

Barrel export:

```typescript
// src/shared/components/layout/index.ts
export { ScreenWrapper } from './ScreenWrapper';
```

---

## Theme Dependency

`ScreenWrapper` imports `colors` from your theme. Create this if you haven't yet:

```typescript
// src/theme/colors.ts
export const colors = {
  background: '#FFFFFF',
  surface: '#F5F5F5',
  primary: '#2596be',
  text: '#1a1a1a',
  textSecondary: '#666666',
  border: '#E0E0E0',
  error: '#DC3545',
  success: '#28A745',
};
```

```typescript
// src/theme/index.ts
export { colors } from './colors';
```
