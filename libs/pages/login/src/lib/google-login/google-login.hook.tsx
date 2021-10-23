import { useCallback } from 'react';
import axios from '@pasnik/axios';
import { LoginGoogleDto } from '@pasnik/api/data-transfer';

export function useGoogleLogin() {
  const signInUsingGoogle = useCallback(
    (accessToken: string) =>
      axios
        .get<LoginGoogleDto>('/api/auth/google', {
          params: { access_token: accessToken },
        })
        .then(({ data }) => data.accessToken),
    []
  );

  return {
    signInUsingGoogle,
  };
}
