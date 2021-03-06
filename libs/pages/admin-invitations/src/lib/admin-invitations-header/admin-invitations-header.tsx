import { useTranslation } from 'react-i18next';

export const AdminInvitationsHeader = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-white shadow">
      <div className="px-4 sm:px-6 lg:max-w-6xl md:mx-auto lg:px-8">
        <div className="py-6 xl:flex xl:items-center lg:justify-between lg:border-t lg:border-gray-200">
          <div className="flex-1 min-w-0 ml-3">
            <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:leading-9 sm:truncate flex items-center">
              {t('invitation.invitations')}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};
