import { NotificationType } from '@pasnik/api/data-transfer';

export interface NotificationTarget {
  browser: boolean;
  inApp: boolean;
}

export class BaseEvent {
  protected readonly target: NotificationTarget;
  action: NotificationType;
  data?: unknown;
}
