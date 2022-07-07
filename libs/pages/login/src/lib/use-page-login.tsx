import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InvitationRequiredError, useQuery } from '@pasnik/shared/utils';
import { InvitationStatus } from '@pasnik/api/data-transfer';
import { PopupClosedError } from './auth-popup/popup-closed.error';
import { useQueryClient } from 'react-query';

export const usePageLogin = () => {
  const navigate = useNavigate();
  const query = useQuery();
  const queryClient = useQueryClient();
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

  const onSuccess = useCallback(
    async (data: unknown = {}) => {
      setHasError(false);
      setInvitationStatus(undefined);

      if (!data) {
        await queryClient.resetQueries(['users', 'me']);
        return;
      }

      const redirectTo = query.get('redirectTo');
      if (redirectTo) {
        navigate(decodeURIComponent(redirectTo));
      } else {
        navigate('/');
      }
    },
    [navigate, query, queryClient]
  );

  return {
    requestToken,
    invitationStatus,
    hasError,
    onSuccess,
    onError,
  };
};
