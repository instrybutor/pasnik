import { useCallback } from 'react';
import axios from '@pasnik/axios';
import { LoginGoogleDto } from '@pasnik/api/data-transfer';

export function useSlackLogin() {
  const signInUsingSlack = useCallback(
    (accessToken: string) =>
      axios
        .get<LoginGoogleDto>('/auth/slack', {
          params: { access_token: accessToken },
        })
        .then(({ data }) => data.accessToken),
    []
  );

  return {
    signInUsingSlack,
  };
}
