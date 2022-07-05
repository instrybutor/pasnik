import { useCallback, useMemo, useRef } from 'react';
import { isAfter } from 'date-fns';

import { useNotificationsQuery } from '@pasnik/features-notifications';
import { useCurrentUser, useNotificationSeenMutation } from '@pasnik/auth';

export const useNotificationsDropdown = () => {
  const { data: notifications } = useNotificationsQuery();
  const { data: user } = useCurrentUser();

  const lastSeenDate = useMemo(
    () => new Date(user?.lastNotificationDate ?? ''),
    [user?.lastNotificationDate]
  );

  const { mutateAsync: setLastSeenDate } = useNotificationSeenMutation();

  const popoverRef = useRef<HTMLButtonElement>(null);

  const hasNewNotifications = useMemo(() => {
    return notifications!.some((notification) =>
      isAfter(new Date(notification.createdAt), lastSeenDate)
    );
  }, [notifications, lastSeenDate]);

  const onPopoverClose = useCallback(() => {
    setLastSeenDate();
  }, [setLastSeenDate]);

  return {
    popoverRef,
    onPopoverClose,
    notifications,
    hasNewNotifications,
    lastSeenDate,
  };
};
