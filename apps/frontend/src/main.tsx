import { StrictMode } from 'react';
import i18next from 'i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import * as ReactDOM from 'react-dom';

import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import App from './app/app';

i18next
  .use(
    resourcesToBackend((language, _, callback) => {
      import(`../locales/${language}.json`)
        .then((resources) => callback(null, resources))
        .catch((error) => callback(error, null));
    })
  )
  .init({
    lng: 'pl',
    debug: process.env.NODE_ENV === 'development',
    preload: ['pl'],
    defaultNS: 'translation',
    fallbackLng: ['pl'],
  })
  .then(() => {
    const queryClient = new QueryClient();

    ReactDOM.render(
      <StrictMode>
        <QueryClientProvider client={queryClient}>
          <App />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </StrictMode>,
      document.getElementById('root')
    );
  });
