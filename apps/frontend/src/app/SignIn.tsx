import { Link, useHistory } from 'react-router-dom';

import { IGoogleOneTapLoginProps, useAuth } from '@pasnik/shared/utils-auth';

import GoogleLoginButton from './GoogleButtonLogin';

function Copyright() {
  return (
    <span className="">
      {'Copyright © '}
      <Link to="#">Paśnik</Link> {new Date().getFullYear()}
      {'.'}
    </span>
  );
}

export default function SignIn() {
  const auth = useAuth();
  const history = useHistory();

  const onSuccess = ({
    credential,
  }: google.accounts.IGoogleCallbackResponse) => {
    if (credential) {
      auth.signIn(credential).then(() => {
        history.push('/');
      });
    }
  };

  const config: IGoogleOneTapLoginProps = {
    client_id: process.env.NX_GOOGLE_CLIENT_ID,
    cancel_on_tap_outside: false,
    callback: onSuccess,
  } as IGoogleOneTapLoginProps;

  return (
    <div>
      <div>
        <GoogleLoginButton googleAccountConfigs={config} />
      </div>
      <div>
        <Copyright />
      </div>
    </div>
  );
}
