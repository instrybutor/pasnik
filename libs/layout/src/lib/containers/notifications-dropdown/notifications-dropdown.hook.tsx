import { useRef, useState, useMemo } from 'react';
import { isAfter } from 'date-fns';

import { useNotificationsQuery } from '@pasnik/shared/notification';

export const useNotificationsDropdown = () => {
  const { data: notifications } = useNotificationsQuery();
  const popoverRef = useRef<HTMLButtonElement>(null);
  const [lastSeenDate] = useState(new Date());

  const hasNewNotifications = useMemo(() => {
    return notifications!.some((notification) =>
      isAfter(new Date(notification.createdAt), lastSeenDate)
    );
  }, [notifications, lastSeenDate]);

  return {
    popoverRef,
    notifications,
    hasNewNotifications,
    lastSeenDate,
  };
};
