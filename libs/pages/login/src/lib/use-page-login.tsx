import { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { useAuth } from '@pasnik/auth';
import { useQuery } from '@pasnik/shared/utils';
import { AxiosError } from 'axios';
import { setAuthToken } from '@pasnik/axios';

interface LoginError402 {
  requestToken: string;
}

export const usePageLogin = () => {
  const history = useHistory();
  const query = useQuery();
  const { fetchUser } = useAuth();
  const [requestToken, setRequestToken] = useState<string | null>(null);
  const [hasError, setHasError] = useState(false);
  const [invitationPending, setInvitationPending] = useState(false);

  const onError = useCallback(
    (error: AxiosError) => {
      if (error.response?.status === 402) {
        const { requestToken } = error.response.data as LoginError402;
        setRequestToken(requestToken);
      } else if (error.response?.status === 304) {
        setInvitationPending(true);
      } else {
        setHasError(true);
      }
    },
    [setRequestToken]
  );

  const onSuccess = useCallback(
    (accessToken: string) => {
      setAuthToken(accessToken);
      setHasError(false);
      setInvitationPending(false);

      fetchUser()
        .then(() => {
          const redirectTo = query.get('redirectTo');
          if (redirectTo) {
            history.push(decodeURIComponent(redirectTo));
          } else {
            history.push('/');
          }
        })
        .catch(onError);
    },
    [fetchUser, onError, history, query]
  );

  return {
    requestToken,
    invitationPending,
    hasError,
    onSuccess,
    onError,
  };
};
