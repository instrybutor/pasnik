import { useRef, useState, useMemo, useCallback } from 'react';
import { isAfter } from 'date-fns';

import { useNotificationsQuery } from '@pasnik/shared/notification';

export const useNotificationsDropdown = () => {
  const { data: notifications } = useNotificationsQuery();
  const popoverRef = useRef<HTMLButtonElement>(null);
  const [lastSeenDate, setLastSeenDate] = useState(new Date());

  const hasNewNotifications = useMemo(() => {
    return notifications!.some((notification) =>
      isAfter(new Date(notification.createdAt), lastSeenDate)
    );
  }, [notifications, lastSeenDate]);

  const onPopoverClose = useCallback(() => {
    setLastSeenDate(new Date());
  }, []);

  return {
    popoverRef,
    onPopoverClose,
    notifications,
    hasNewNotifications,
    lastSeenDate,
  };
};
