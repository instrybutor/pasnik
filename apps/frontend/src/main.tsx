import { StrictMode, Suspense } from 'react';
import * as ReactDOM from 'react-dom';

import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import { FullscreenSpinner } from '@pasnik/components';

import App from './app/app';
import './i18n';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
      refetchOnWindowFocus: false,
      retry: false,
    },
    mutations: {
      useErrorBoundary: false,
    },
  },
});

ReactDOM.render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<FullscreenSpinner />}>
        <App />
      </Suspense>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>,
  document.getElementById('root')
);
