import { useTranslation } from 'react-i18next';
import { XCircleIcon } from '@heroicons/react/solid';

export function ErrorAlert() {
  const { t } = useTranslation();

  return (
    <div className="rounded-md bg-red-50 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-800">
            {t('errors.login')}
          </h3>
        </div>
      </div>
    </div>
  );
}
