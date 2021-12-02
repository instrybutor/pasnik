import { t } from 'i18next';
import { InvitationStatus } from '@pasnik/api/data-transfer';

import { ErrorAlert } from './error-alert/error-alert';
import { GoogleLogin } from './google-login/google-login';
import { Invitation } from './invitation/invitation';
import { InvitationPendingAlert } from './invitation-pending-alert/invitation-pending-alert';
import { usePageLogin } from './use-page-login';
import { SlackLogin } from './slack-login/slack-login';
import { InvitationRejectedAlert } from './invitation-rejected-alert/invitation-pending-alert';

export function PagesLogin() {
  const { requestToken, onError, invitationStatus, hasError, onSuccess } =
    usePageLogin();

  return (
    <>
      <Invitation requestToken={requestToken} onError={onError} />
      <div
        className="min-h-screen bg-gray-50 flex flex-col justify-center"
        style={{
          background:
            'url(https://source.unsplash.com/1200x800?food,meal) no-repeat center center',
          backgroundSize: 'cover',
        }}
      >
        <div
          className="absolute top-0 right-0 w-screen md:w-1/3 h-screen bg-white flex flex-col shadow-lg py-16 gap-8"
          style={{ boxShadow: '-2px 1px 10px rgb(0 0 0 / 15%)' }}
        >
          <h1 className="text-4xl text-center font-semibold flex flex-col">
            <span role="img" aria-label="food">
              🍔 Paśnik
            </span>
            <small className="text-xs text-gray-400">
              {t('landing.slogan')}
            </small>
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
      </div>
    </>
  );
}

export default PagesLogin;
