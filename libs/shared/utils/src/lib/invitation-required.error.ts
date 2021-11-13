import { InvitationStatus } from '@pasnik/api/data-transfer';

export class InvitationRequiredError extends Error {
  constructor(
    private readonly status: InvitationStatus,
    private readonly requestToken?: string
  ) {
    super('Invitation required');
  }

  getRequestToken() {
    return this.requestToken;
  }

  getStatus() {
    return this.status;
  }
}
