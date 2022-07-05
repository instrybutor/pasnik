import { CreateOrderModal } from '@pasnik/features/orders';
import { ModalButton } from '@pasnik/components';
import { useTranslation } from 'react-i18next';
import { useWorkspaceById } from '@pasnik/features/workspaces';
import { useCurrentUser } from '@pasnik/auth';

export function HeaderCreateOrderButton() {
  const { t } = useTranslation();
  const { data: currentUser } = useCurrentUser();
  const workspace = useWorkspaceById(currentUser?.currentWorkspaceId);

  return (
    <ModalButton
      className="flex-1 text-center items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
      modal={CreateOrderModal}
      props={{ workspace }}
    >
      {t('dashboard.create_order')}
    </ModalButton>
  );
}
