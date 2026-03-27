import {SafeAreaProvider} from 'react-native-safe-area-context';
import {AppRouter} from './router';

function App() {
  return (
    <SafeAreaProvider>
      <AppRouter />
    </SafeAreaProvider>
  );
}

export default App;
