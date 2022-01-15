import i18next from 'i18next';

import { OrderStatus } from '@pasnik/api/data-transfer';

import { browserNotify } from './notification.browser';

export const notifyStatusChanged = (
  placeName: string,
  status: OrderStatus,
  orderSlug: string
) => {
  const url = `/order/${orderSlug}`;

  return browserNotify(
    {
      title: i18next.t('notifications.orderStatusChanged', {
        placeName,
        status: i18next.t(`orderStatus.${status}`).toUpperCase(),
      }),
      icon: './assets/favicon-32x32.png',
      body: i18next.t('notifications.openOrder'),
    },
    url
  );
};
