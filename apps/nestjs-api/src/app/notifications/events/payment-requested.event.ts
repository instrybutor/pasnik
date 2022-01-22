export const EventName = 'order.payment.requested';

export class PaymentRequestedEvent {
  target = {
    browser: true,
    inApp: false,
  };
}
