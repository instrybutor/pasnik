import { StrictMode, Suspense } from 'react';

import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import { FullscreenSpinner } from '@pasnik/components';

import App from './app/app';
import './i18n';
import { createRoot } from 'react-dom/client';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
    mutations: {
      useErrorBoundary: false,
    },
  },
});

const container = document.getElementById('root');
if (!container) {
  throw new Error('root element not found');
}
const root = createRoot(container);

root.render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<FullscreenSpinner />}>
        <App />
      </Suspense>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>
);
