import { useTranslation } from 'react-i18next';
import { InvitationStatus } from '@pasnik/api/data-transfer';

import { ErrorAlert } from '../error-alert/error-alert';
import { GoogleLogin } from '../google-login/google-login';
import { InvitationPendingAlert } from '../invitation-pending-alert/invitation-pending-alert';
import { usePageLogin } from '../use-page-login';
import { SlackLogin } from '../slack-login/slack-login';
import { InvitationRejectedAlert } from '../invitation-rejected-alert/invitation-pending-alert';
import { Invitation } from '../invitation/invitation';
import { useCurrentUser } from '@pasnik/auth';
import { useEffect, useState } from 'react';

export function LoginSection() {
  const { onError, requestToken, invitationStatus, hasError, onSuccess } =
    usePageLogin();
  const { t } = useTranslation();
  const [activeRef, setActiveRef] = useState(false);

  useEffect(() => {
    setActiveRef(true);
  }, []);

  useCurrentUser({
    onSuccess,
    enabled: activeRef,
  });

  return (
    <div className="flex flex-col py-16 gap-8">
      <Invitation requestToken={requestToken} onError={onError} />
      <h1 className="text-4xl text-center font-semibold flex flex-col">
        <span role="img" aria-label="food">
          🍔 Paśnik
        </span>
        <small className="text-xs text-gray-400">{t('landing.slogan')}</small>
      </h1>

      <div className="border-b border-b-gray-100 w-full" />
      <span className="mx-auto">{t('landing.login_text')}</span>

      <div>
        {invitationStatus === InvitationStatus.PENDING && (
          <div className="mb-8">
            <InvitationPendingAlert />
          </div>
        )}
        {invitationStatus === InvitationStatus.REJECTED && (
          <div className="mb-8">
            <InvitationRejectedAlert />
          </div>
        )}
        {hasError && (
          <div className="mb-8">
            <ErrorAlert />
          </div>
        )}

        <div className="flex justify-center flex-col items-center gap-6">
          <GoogleLogin onSuccess={onSuccess} onError={onError} />
          <SlackLogin onSuccess={onSuccess} onError={onError} />
        </div>
      </div>
    </div>
  );
}
