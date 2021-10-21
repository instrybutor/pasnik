import { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { IGoogleOneTapLoginProps, useAuth } from '@pasnik/shared/utils-auth';

import { GoogleButtonLogin } from './components/google-button-login';
import { RequestAccessModal } from './components/request-access-modal/request-access-modal';
import { SuccessModal } from '@pasnik/components';

export const SignIn: React.FC = () => {
  const auth = useAuth();
  const history = useHistory();

  const [requestToken, setRequestToken] = useState<string | null>(null);
  const [successModalOpen, setSuccessModalOpen] = useState(false);

  const requestAccessSubmit = useCallback(() => {
    return auth.requestAccess(requestToken!).then((response) => {
      setSuccessModalOpen(true);
      setRequestToken(null);
      return;
    });
  }, [requestToken, auth]);

  const requestAccessCancel = useCallback(() => {
    setRequestToken(null);
  }, [setRequestToken]);

  const onSuccess = useCallback(
    ({ credential }: google.accounts.IGoogleCallbackResponse) => {
      if (credential) {
        auth.signIn(credential).then(({ success, requestToken }) => {
          if (success) {
            history.push('/');
          } else if (requestToken) {
            setRequestToken(requestToken);
          }
        });
      }
    },
    [auth, history]
  );

  const config: IGoogleOneTapLoginProps = {
    client_id: process.env.NX_GOOGLE_CLIENT_ID,
    cancel_on_tap_outside: false,
    callback: onSuccess,
  } as IGoogleOneTapLoginProps;

  return (
    <>
      <RequestAccessModal
        isOpen={!!requestToken}
        cancelHandler={requestAccessCancel}
        submitHandler={requestAccessSubmit}
      />
      <SuccessModal
        title="Zapytanie wysłane"
        buttonText="Wróć na stronę logowania"
        open={successModalOpen}
        setOpen={setSuccessModalOpen}
      />
      <div className="flex w-screen h-screen flex-grow items-center justify-center">
        <div className="flex flex-col text-center gap-4">
          <h1 className="text-4xl">
            <span role="img" aria-label="food">
              🍔
            </span>{' '}
            Paśnik
          </h1>
          <GoogleButtonLogin googleAccountConfigs={config} />
        </div>
      </div>
    </>
  );
};
