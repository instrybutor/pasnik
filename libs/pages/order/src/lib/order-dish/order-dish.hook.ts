import { AddDishDto, ExpenseModel } from '@pasnik/api/data-transfer';
import { useCallback } from 'react';
import {
  useDishAddMutation,
  useDishDeleteMutation,
  useDishUpdateMutation,
} from '@pasnik/features/orders';
import { useToast } from '@pasnik/components';
import { useTranslation } from 'react-i18next';
import { useSlug } from '@pasnik/shared/utils';

export function useOrderDish(expense: ExpenseModel) {
  const { t } = useTranslation();
  const { toast } = useToast();
  const slug = useSlug();
  const { mutateAsync: deleteDishAsync } = useDishDeleteMutation(slug, expense);
  const { mutateAsync: addDishAsync } = useDishAddMutation(slug);
  const { mutateAsync: updateDishAsync } = useDishUpdateMutation(slug, expense);

  const onDuplicate = useCallback(async () => {
    await addDishAsync({
      priceCents: expense.priceCents,
      name: expense.name,
    });

    toast({ type: 'success', title: t('order.toast.duplicate_dish') });
  }, [t, expense, addDishAsync, toast]);

  const onDelete = useCallback(async () => {
    await deleteDishAsync();
    toast({ type: 'success', title: t('order.toast.delete_dish') });
  }, [t, toast, deleteDishAsync]);

  const onAdd = useCallback(
    async (data: AddDishDto) => {
      await addDishAsync(data);
      toast({ type: 'success', title: t('order.toast.add_dish') });
    },
    [t, toast, addDishAsync]
  );
  const onUpdate = useCallback(
    async (data: AddDishDto) => {
      await updateDishAsync(data);
      toast({ type: 'success', title: t('order.toast.update_dish') });
    },
    [t, toast, updateDishAsync]
  );
  return {
    onDelete,
    onDuplicate,
    onAdd,
    onUpdate,
  };
}
