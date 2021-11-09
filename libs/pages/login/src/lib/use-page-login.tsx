import { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { useAuth } from '@pasnik/auth';
import { useQuery } from '@pasnik/shared/utils';
import { LoginError } from './login.error';
import { InvitationStatus } from '@pasnik/api/data-transfer';

export const usePageLogin = () => {
  const history = useHistory();
  const query = useQuery();
  const { fetchUser } = useAuth();
  const [requestToken, setRequestToken] = useState<string | null>(null);
  const [hasError, setHasError] = useState(false);
  const [invitationPending, setInvitationPending] = useState(false);

  const onError = useCallback(
    (error?: Error) => {
      if (error instanceof LoginError) {
        if (
          error.status === InvitationStatus.NO_INVITATION &&
          error.requestToken
        ) {
          setRequestToken(error.requestToken);
        } else if (error.status === InvitationStatus.PENDING) {
          setInvitationPending(true);
        } else {
          setHasError(true);
        }
      } else if (error) {
        setHasError(true);
      }
    },
    [setRequestToken]
  );

  const onSuccess = useCallback(() => {
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
  }, [fetchUser, onError, history, query]);

  return {
    requestToken,
    invitationPending,
    hasError,
    onSuccess,
    onError,
  };
};
