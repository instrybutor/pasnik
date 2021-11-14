import { InvitationStatus } from '@pasnik/api/data-transfer';

export class InvitationRequiredError extends Error {
  constructor(
    public readonly status: InvitationStatus,
    public readonly requestToken?: string
  ) {
    super('Invitation required');
  }
}
