import { ShareModel } from '@pasnik/api/data-transfer';

export type ShareDto = Pick<
  ShareModel,
  'share' | 'shareType' | 'workspaceUserId'
> & { id?: number };
