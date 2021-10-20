import { useAuth } from '@pasnik/shared/utils-auth';
import { useHistory } from 'react-router-dom';
import { useCallback } from 'react';

export const RequestAccess = () => {
  const history = useHistory<{ requestToken: string }>();
  const { requestToken } = history.location.state;
  if (!requestToken) {
    history.push('/');
  }
  const { requestAccess } = useAuth();

  const requestAccessHandler = useCallback(() => {
    requestAccess(history.location.state.requestToken).then();
  }, []);
  return (
    <>
      You're not allowed to visit this page. Click here to{' '}
      <button onClick={}>request access</button>
    </>
  );
};
