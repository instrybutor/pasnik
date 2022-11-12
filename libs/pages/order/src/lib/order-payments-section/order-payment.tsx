import { AddPayerToOrderDto } from '@pasnik/api/data-transfer';
import {
  Button,
  CurrencyInput,
  currencyTransform,
  Form,
  FormField,
  UserAvatar,
  UserName,
} from '@pasnik/components';
import {
  useWorkspaceById,
  useWorkspaceUsers,
} from '@pasnik/features/workspaces';
import { useCallback, useMemo, useRef } from 'react';
import {
  useCurrentOrder,
  useOrderPaymentAddMutation,
} from '@pasnik/features/orders';
import { useTranslation } from 'react-i18next';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { useSlug } from '@pasnik/shared/utils';
import { ArrowDownIcon, XIcon } from '@heroicons/react/solid';
import { usePayments } from './use-payments';
import classNames from 'classnames';

export interface OrderPaymentProps {
  payment: AddPayerToOrderDto;
}
export function OrderPayment({ payment }: OrderPaymentProps) {
  const { t } = useTranslation();
  const slug = useSlug();
  const { data: order } = useCurrentOrder();
  const workspace = useWorkspaceById(order?.operation.workspaceId);
  const { data: users } = useWorkspaceUsers(workspace?.slug);
  const user = useMemo(
    () => users?.find((user) => user.id === payment.workspaceUserId),
    [users, payment?.workspaceUserId]
  );
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { mutateAsync } = useOrderPaymentAddMutation(slug);
  const { balanceCents, totalExpenses } = usePayments();

  const splitRestHandler = useCallback(async () => {
    await mutateAsync({
      ...payment,
      amountCents: (payment.amountCents ?? 0) - balanceCents,
    });
  }, [balanceCents, payment, mutateAsync]);

  const clearPaymentHandler = useCallback(async () => {
    await mutateAsync({
      ...payment,
      amountCents: 0,
    });
  }, [mutateAsync, payment]);

  return (
    <Form<AddPayerToOrderDto>
      defaultValues={payment}
      resolver={classValidatorResolver(AddPayerToOrderDto)}
      onSubmit={async (data) => {
        await mutateAsync(data);
      }}
    >
      <button className="hidden" ref={buttonRef} />
      <div className="flex items-center gap-6 px-6 py-4 -my-0.5">
        <div className="flex items-center">
          <div className="flex relative">
            <UserAvatar user={user?.user} size="sm" />
          </div>
        </div>

        <div className="flex-1 w-full">
          <div className="text-sm text-gray-500 min-w-0 flex-1 text-left">
            <UserName user={user?.user} />
          </div>
        </div>

        <div className="flex-0 text-sm text-gray-500 text-right flex-col">
          <div
            className={classNames('text-sm text-gray-500 w-full', {
              'xsm:w-32': totalExpenses >= 1000,
              'xsm:w-28': totalExpenses < 1000,
            })}
          >
            <FormField
              label={t('order.form.price')}
              labelClassName="xsm:hidden block"
              name="amountCents"
              errorTooltip={true}
              suffix="zł"
              prefix={
                <>
                  <Button
                    onClick={splitRestHandler}
                    type="button"
                    color="none"
                    rounded="full"
                  >
                    <ArrowDownIcon className="h-3 w-3" aria-hidden="true" />
                  </Button>
                  <Button
                    onClick={clearPaymentHandler}
                    type="button"
                    color="none"
                    rounded="full"
                  >
                    <XIcon className="h-3 w-3" aria-hidden="true" />
                  </Button>
                </>
              }
              transform={currencyTransform}
              onBlur={(e) => {
                buttonRef.current?.click();
              }}
            >
              <CurrencyInput
                type="text"
                inputMode="numeric"
                placeholder="0.00"
                className="text-right"
              />
            </FormField>
          </div>
        </div>
      </div>
    </Form>
  );
}
