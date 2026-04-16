import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppRouter } from './router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from './components';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 2,
            refetchOnWindowFocus: false
        }
    }
})

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <ErrorBoundary>
                <SafeAreaProvider>
                    <AppRouter />
                </SafeAreaProvider>
            </ErrorBoundary>
        </QueryClientProvider>
    );
}

export default App;
