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
      className="flex-1 px-4 py-2 text-sm font-medium rounded-md justify-center"
      modal={CreateOrderModal}
      props={{ workspace }}
    >
      {t('dashboard.create_order')}
    </ModalButton>
  );
}
