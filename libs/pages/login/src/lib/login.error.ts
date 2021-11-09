import { InvitationStatus } from '@pasnik/api/data-transfer';

export class LoginError extends Error {
  constructor(
    public readonly status: InvitationStatus,
    public readonly requestToken?: string
  ) {
    super();
  }
}
