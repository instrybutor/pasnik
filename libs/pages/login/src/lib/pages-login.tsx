import { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useQuery } from '@pasnik/shared/utils';
import { useAuth } from '@pasnik/shared/utils-auth';
import { ErrorAlert } from './error-alert/error-alert';
import { GoogleLogin } from './google-login/google-login';
import { setAuthToken } from '@pasnik/axios';

/* eslint-disable-next-line */
export interface PagesLoginProps {}

export function PagesLogin(props: PagesLoginProps) {
  const { fetchUser } = useAuth();
  const history = useHistory();
  const query = useQuery();
  const [hasError, setHasError] = useState(false);

  const onError = useCallback((error: Response) => {
    setHasError(true);
  }, []);

  const onSuccess = useCallback(
    (accessToken: string) => {
      setAuthToken(accessToken);

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
  );
}

export default PagesLogin;
