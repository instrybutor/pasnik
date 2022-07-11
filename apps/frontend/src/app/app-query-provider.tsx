import { PropsWithChildren, useMemo } from 'react';
import { QueryCache, QueryClient, QueryClientProvider } from 'react-query';
import { useToast } from '@pasnik/components';
import { useTranslation } from 'react-i18next';

export function AppQueryProvider({ children }: PropsWithChildren) {
  const { toast } = useToast();
  const { t } = useTranslation();
  const queryClient = useMemo(
    () =>
      new QueryClient({
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
        queryCache: new QueryCache({
          onError: (error: unknown, query) => {
            if (query.state.data !== undefined) {
              toast({
                type: 'error',
                title: t('errors.server.title'),
              });
            }
          },
        }),
      }),
    [toast, t]
  );
  return (
    queryClient && (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    )
  );
}
