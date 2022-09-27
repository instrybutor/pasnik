import { Button, Modal, useModalContext } from '@pasnik/components';
import {
  ExpenseModel,
  ShareDto,
  ShareType,
  WorkspaceModel,
} from '@pasnik/api/data-transfer';
import { useTranslation } from 'react-i18next';
import { useWorkspaceUsersEntities } from '@pasnik/features/workspaces';
import { useState } from 'react';
import { ExpenseShares } from '@pasnik/features/expenses';

export interface DishSharesModelProps {
  expense: Pick<ExpenseModel, 'priceCents'>;
  shares: ShareDto[];
  workspace: WorkspaceModel;
}

export function DishSharesModal({
  expense,
  shares,
  workspace,
}: DishSharesModelProps) {
  const [_shares, setShares] = useState<ShareDto[]>(shares);
  const { t } = useTranslation();
  const users = useWorkspaceUsersEntities(workspace.slug);
  const { closeModal } = useModalContext();
  return (
    <Modal
      maxWidthClass="sm:max-w-sm"
      closeButton={false}
      noPadding
      className="p-4"
    >
      <ExpenseShares
        users={users}
        shares={_shares}
        expense={expense}
        fixedShareType={ShareType.Coefficient}
        onChange={setShares}
      />
      <Modal.Footer>
        <Button
          onClick={() => closeModal(_shares)}
          type="submit"
          className="px-4 py-2 sm:text-sm justify-center"
        >
          {t('actions.submit')}
        </Button>
        <Button
          onClick={() => closeModal()}
          type="button"
          color="secondary"
          className="px-4 py-2 sm:text-sm justify-center"
        >
          {t('actions.cancel')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
