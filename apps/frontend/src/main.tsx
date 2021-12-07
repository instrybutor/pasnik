import { StrictMode, Suspense } from 'react';
import * as ReactDOM from 'react-dom';

import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import App from './app/app';
import './i18n';
import { FullscreenSpinner } from '@pasnik/components';

const queryClient = new QueryClient();

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
