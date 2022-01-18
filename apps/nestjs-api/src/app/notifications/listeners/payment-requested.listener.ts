import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { EventName } from '../events/payment-requested.event';

@Injectable()
export class PaymentRequestedListener {
  @OnEvent(EventName)
  handlePaymentRequested() {}
}
