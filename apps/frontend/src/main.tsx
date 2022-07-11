import { StrictMode, Suspense } from 'react';
import { ReactQueryDevtools } from 'react-query/devtools';

import { FullscreenSpinner } from '@pasnik/components';

import App from './app/app';
import './i18n';
import { createRoot } from 'react-dom/client';
import { AppQueryProvider } from './app/app-query-provider';

const container = document.getElementById('root');
if (!container) {
  throw new Error('root element not found');
}
const root = createRoot(container);

root.render(
  <StrictMode>
    <Suspense fallback={<FullscreenSpinner />}>
      <AppQueryProvider>
        <App />
        <ReactQueryDevtools initialIsOpen={false} />
      </AppQueryProvider>
    </Suspense>
  </StrictMode>
);
