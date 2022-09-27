import { EntityRepository, Repository } from 'typeorm';
import { ExpenseEntity, ShareEntity, WorkspaceUserEntity } from '../entities';
import { ShareType } from '@pasnik/api/data-transfer';

@EntityRepository(ShareEntity)
export class SharesRepository extends Repository<ShareEntity> {
  async createShare(
    workspaceUser: WorkspaceUserEntity,
    share: number,
    shareType: ShareType,
    expense: ExpenseEntity
  ) {
    const shareEntity = new ShareEntity();

    shareEntity.workspaceUser = workspaceUser;
    shareEntity.share = share;
    shareEntity.shareType = shareType;
    shareEntity.expense = expense;

    return await this.save(shareEntity);
  }
}
