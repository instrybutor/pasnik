import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { InvitationRequiredError } from '@pasnik/shared/utils';

import { useAuthPopup } from '../auth-popup/auth-popup';

export interface SlackLoginProps {
  onSuccess: () => void;
  onError: (error: InvitationRequiredError) => void;
}

export const SlackLogin = ({ onSuccess, onError }: SlackLoginProps) => {
  const { openSignInWindow } = useAuthPopup();
  const buttonClick = useCallback(() => {
    openSignInWindow('/auth/slack').then(onSuccess).catch(onError);
  }, [openSignInWindow, onSuccess, onError]);
  const { t } = useTranslation();

  return (
    <button
      onClick={buttonClick}
      className="items-center border-gray-300 border w-64 justify-center h-12 font-normal inline-flex rounded-md hover:bg-gray-100"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6 mr-3"
        viewBox="0 0 122.8 122.8"
      >
        <path
          d="M25.8 77.6c0 7.1-5.8 12.9-12.9 12.9S0 84.7 0 77.6s5.8-12.9 12.9-12.9h12.9v12.9zm6.5 0c0-7.1 5.8-12.9 12.9-12.9s12.9 5.8 12.9 12.9v32.3c0 7.1-5.8 12.9-12.9 12.9s-12.9-5.8-12.9-12.9V77.6z"
          fill="#e01e5a"
        />
        <path
          d="M45.2 25.8c-7.1 0-12.9-5.8-12.9-12.9S38.1 0 45.2 0s12.9 5.8 12.9 12.9v12.9H45.2zm0 6.5c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9H12.9C5.8 58.1 0 52.3 0 45.2s5.8-12.9 12.9-12.9h32.3z"
          fill="#36c5f0"
        />
        <path
          d="M97 45.2c0-7.1 5.8-12.9 12.9-12.9s12.9 5.8 12.9 12.9-5.8 12.9-12.9 12.9H97V45.2zm-6.5 0c0 7.1-5.8 12.9-12.9 12.9s-12.9-5.8-12.9-12.9V12.9C64.7 5.8 70.5 0 77.6 0s12.9 5.8 12.9 12.9v32.3z"
          fill="#2eb67d"
        />
        <path
          d="M77.6 97c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9-12.9-5.8-12.9-12.9V97h12.9zm0-6.5c-7.1 0-12.9-5.8-12.9-12.9s5.8-12.9 12.9-12.9h32.3c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9H77.6z"
          fill="#ecb22e"
        />
      </svg>
      {t('landing.slack')}
    </button>
  );
};
