export interface Notification<T> {
  id: string;
  type: string;
  status: string;
  data: T;
  createdAt: string;
}

export type OrderNotification = Notification<{
  slug: string;
  title: string;
}>;

export interface NotificationEvent<T> {
  target?: {
    browser?: boolean;
    inApp?: boolean;
    slack?: boolean;
    email?: boolean;
  };
  createdAt: string;
  notification: Notification<T>;
}
