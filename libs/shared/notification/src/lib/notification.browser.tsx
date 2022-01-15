interface BrowserNotification {
  title: string;
  body?: string;
  icon?: string;
  url?: string;
}

// interface Notification {
//   title: string;
//   message: string;
//   url?: string;
//   createdAt: string;
// }

// type NotificationTarget = 'browser' | 'app';

// interface NotificationEvent {
//   notification: Notification;
//   target: NotificationTarget[];
// }

export const initBrowserNotifications = () => {
  if (!('Notification' in window)) {
    return false;
  }

  return Notification.requestPermission().then(
    (permission: NotificationPermission) => {
      if (permission === 'granted') {
        return true;
      }

      return false;
    }
  );
};

export const browserNotify = (
  { title, icon, body }: BrowserNotification,
  url?: string
) => {
  if (!initBrowserNotifications()) {
    return;
  }

  const notification = new Notification(title, { body, icon });

  if (!url) {
    return;
  }

  notification.onclick = () => {
    window.open(url);
  };
};
