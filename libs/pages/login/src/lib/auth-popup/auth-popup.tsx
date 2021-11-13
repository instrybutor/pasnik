import { useCallback } from 'react';
import PromiseWindow from 'promise-window';
import { InvitationStatus } from '@pasnik/api/data-transfer';
import { PopupClosedError } from './popup-closed.error';
import { InvitationRequiredError } from '@pasnik/shared/utils';

interface AuthErrorResponse {
  status: InvitationStatus;
  requestToken?: string;
}

export const useAuthPopup = () => {
  const openSignInWindow = useCallback((url: string) => {
    return PromiseWindow.open(url, {
      windowName: 'oauth',
      width: 600,
      height: 600,
    }).catch((value: AuthErrorResponse | string) => {
      const authErrorResponse = value as AuthErrorResponse;
      if (authErrorResponse.status) {
        throw new InvitationRequiredError(
          authErrorResponse.status,
          authErrorResponse.requestToken
        );
      }
      throw new PopupClosedError();
    });
  }, []);

  return {
    openSignInWindow,
  };
};
