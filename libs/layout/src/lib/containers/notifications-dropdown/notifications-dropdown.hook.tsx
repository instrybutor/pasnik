import { useRef, useMemo, useCallback } from 'react';
import { isAfter } from 'date-fns';

import { useNotificationsQuery } from '@pasnik/features-notifications';
import { useUserStore } from '@pasnik/store';

export const useNotificationsDropdown = () => {
  const { data: notifications } = useNotificationsQuery();
  const { lastSeenDate, setLastSeenDate } = useUserStore((state) => ({
    lastSeenDate: new Date(state.user?.lastNotificationDate ?? ''),
    setLastSeenDate: state.updateCurrentUser,
  }));

  const popoverRef = useRef<HTMLButtonElement>(null);

  const hasNewNotifications = useMemo(() => {
    return notifications!.some((notification) =>
      isAfter(new Date(notification.createdAt), lastSeenDate)
    );
  }, [notifications, lastSeenDate]);

  const onPopoverClose = useCallback(() => {
    setLastSeenDate({ lastNotificationDate: new Date() });
  }, [setLastSeenDate]);

  return {
    popoverRef,
    onPopoverClose,
    notifications,
    hasNewNotifications,
    lastSeenDate,
  };
};
