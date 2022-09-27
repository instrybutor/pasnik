import { EntityRepository, Repository } from 'typeorm';
import { AddDishDto, ShareDto, ShareType } from '@pasnik/api/data-transfer';
import {
  ExpenseEntity,
  OrderEntity,
  ShareEntity,
  WorkspaceUserEntity,
} from '../entities';

@EntityRepository(ExpenseEntity)
export class ExpensesRepository extends Repository<ExpenseEntity> {
  async addExpense(
    addDishDto: AddDishDto,
    order: OrderEntity,
    dishOwner: WorkspaceUserEntity,
    currentUser: WorkspaceUserEntity
  ) {
    const expense = new ExpenseEntity();

    expense.name = addDishDto.name;
    expense.priceCents = addDishDto.priceCents;
    expense.workspaceUser = currentUser;
    expense.shares = addDishDto.shares?.map((share) => {
      const shareEntity = new ShareEntity();
      shareEntity.workspaceUserId = share.workspaceUserId;
      shareEntity.shareType = share.shareType;
      shareEntity.share = share.share;
      return shareEntity;
    });

    return await this.save(expense);
  }

  async updateExpense(
    addDishDto: AddDishDto,
    { id }: ExpenseEntity,
    user: WorkspaceUserEntity,
    currentUser: WorkspaceUserEntity
  ) {
    const expense = await this.findOneOrFail({
      where: { id },
      relations: ['shares', 'shares.workspaceUser'],
    });
    expense.name = addDishDto.name;
    expense.priceCents = addDishDto.priceCents;
    expense.workspaceUser = currentUser;
    if (Array.isArray(addDishDto.shares)) {
      expense.shares = this.updateShares(expense.shares, addDishDto.shares);
    }

    return this.save(expense);
  }

  private updateShares(shares: ShareEntity[], sharesDto: ShareDto[]) {
    const cache = shares.reduce((acc, share) => {
      acc[share.id] = share;
      return acc;
    }, {} as Record<number, ShareEntity>);

    return sharesDto.reduce((acc, shareDto) => {
      const shareEntitiy = cache[shareDto.id] ?? new ShareEntity();

      if (
        shares.some(
          ({ workspaceUserId, id }) =>
            id !== shareDto.id && shareDto.workspaceUserId === workspaceUserId
        )
      ) {
        return acc;
      }

      shareEntitiy.share = shareDto.share;
      shareEntitiy.shareType = ShareType.Coefficient;
      shareEntitiy.workspaceUserId =
        shareEntitiy.workspaceUserId ?? shareDto.workspaceUserId;

      if (!shareEntitiy.workspaceUser?.isRemoved) {
        acc.push(shareEntitiy);
      }

      return acc;
    }, [] as ShareEntity[]);
  }
}
