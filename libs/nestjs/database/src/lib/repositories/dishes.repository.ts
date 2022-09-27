import { EntityRepository, Repository } from 'typeorm';
import { AddDishDto, ShareDto, ShareType } from '@pasnik/api/data-transfer';
import {
  DishEntity,
  ExpenseEntity,
  OrderEntity,
  ShareEntity,
  WorkspaceUserEntity,
} from '../entities';

@EntityRepository(DishEntity)
export class DishesRepository extends Repository<DishEntity> {
  async addDish(
    addDishDto: AddDishDto,
    order: OrderEntity,
    dishOwner: WorkspaceUserEntity,
    currentUser: WorkspaceUserEntity
  ) {
    const dish = new DishEntity();
    const expense = new ExpenseEntity();

    expense.operationId = order.operationId;
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
    dish.order = order;
    dish.expense = expense;

    return await this.save(dish);
  }

  async updateDish(
    addDishDto: AddDishDto,
    { id }: DishEntity,
    user: WorkspaceUserEntity,
    currentUser: WorkspaceUserEntity
  ) {
    const dish = await this.findOneOrFail({
      where: { id },
      relations: ['expense', 'expense.shares', 'expense.shares.workspaceUser'],
    });
    dish.expense.name = addDishDto.name;
    dish.expense.priceCents = addDishDto.priceCents;
    dish.expense.workspaceUser = currentUser;
    if (Array.isArray(addDishDto.shares)) {
      dish.expense.shares = this.updateShares(
        dish.expense.shares,
        addDishDto.shares
      );
    }

    return this.save(dish);
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
