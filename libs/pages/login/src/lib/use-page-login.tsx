import { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { useAuth } from '@pasnik/auth';
import { InvitationRequiredError, useQuery } from '@pasnik/shared/utils';
import { InvitationStatus } from '@pasnik/api/data-transfer';
import { PopupClosedError } from './auth-popup/popup-closed.error';

export const usePageLogin = () => {
  const history = useHistory();
  const query = useQuery();
  const { signIn } = useAuth();
  const [requestToken, setRequestToken] = useState<string | null>(null);
  const [hasError, setHasError] = useState(false);
  const [invitationStatus, setInvitationStatus] = useState<
    InvitationStatus | undefined
  >();

  const onError = useCallback(
    (error?: Error) => {
      if (error instanceof InvitationRequiredError) {
        if (
          error.status === InvitationStatus.INVITATION_REQUIRED &&
          error.requestToken
        ) {
          setRequestToken(error.requestToken);
        } else {
          setInvitationStatus(error.status);
        }
      } else if (!(error instanceof PopupClosedError)) {
        setHasError(true);
      }
    },
    [setRequestToken]
  );

  const onSuccess = useCallback(() => {
    setHasError(false);
    setInvitationStatus(undefined);

    signIn()
      .then(() => {
        const redirectTo = query.get('redirectTo');
        if (redirectTo) {
          history.push(decodeURIComponent(redirectTo));
        } else {
          history.push('/');
        }
      })
      .catch(onError);
  }, [signIn, onError, history, query]);

  return {
    requestToken,
    invitationStatus,
    hasError,
    onSuccess,
    onError,
  };
};
