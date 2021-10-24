import { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useQuery } from '@pasnik/shared/utils';
import { useAuth } from '@pasnik/auth';
import { ErrorAlert } from './error-alert/error-alert';
import { GoogleLogin } from './google-login/google-login';
import { setAuthToken } from '@pasnik/axios';
import { Invitation } from './invitation/invitation';
import { AxiosError } from 'axios';
import { InvitationPendingAlert } from './invitation-pending-alert/invitation-pending-alert';

/* eslint-disable-next-line */
export interface PagesLoginProps {}

interface LoginError402 {
  requestToken: string;
}

export function PagesLogin(props: PagesLoginProps) {
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
  return (
    <>
      <Invitation requestToken={requestToken} onError={onError} />
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h1 className="text-4xl text-center">
            <span role="img" aria-label="food">
              🍔
            </span>{' '}
            Paśnik
          </h1>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            {invitationPending && (
              <div className="mb-6">
                <InvitationPendingAlert />
              </div>
            )}
            {hasError && (
              <div className="mb-6">
                <ErrorAlert />
              </div>
            )}

            <div className="flex justify-center">
              <GoogleLogin onSuccess={onSuccess} onError={onError} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PagesLogin;
