import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Desktop } from './components/desktop/Desktop';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false
    }
  }
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Desktop />
    </QueryClientProvider>
  );
}

export default App;
