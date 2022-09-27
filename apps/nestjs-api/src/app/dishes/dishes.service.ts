import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  DishesRepository,
  OrderEntity,
  WorkspaceUserEntity,
  WorkspaceUsersRepository,
} from '@pasnik/nestjs/database';
import { AddDishDto, ShareDto } from '@pasnik/api/data-transfer';
import { In } from 'typeorm';
import { HttpException } from '@nestjs/common/exceptions/http.exception';

@Injectable()
export class DishesService {
  constructor(
    @InjectRepository(DishesRepository)
    private dishesRepository: DishesRepository,
    @InjectRepository(WorkspaceUsersRepository)
    private usersRepository: WorkspaceUsersRepository
  ) {}

  findAll(order: OrderEntity) {
    return this.dishesRepository.find({
      where: { order },
      order: {
        createdAt: 'ASC',
      },
    });
  }

  findOne(order: OrderEntity, id: number) {
    return this.dishesRepository.findOneOrFail({
      where: { order, id },
    });
  }

  async create(
    addDishDto: AddDishDto,
    order: OrderEntity,
    currentUser: WorkspaceUserEntity
  ) {
    await this.validateSharesUsers(currentUser.workspaceId, addDishDto.shares);

    const dishOwner =
      (await this.usersRepository.findOne({
        where: { id: addDishDto.userId },
      })) ?? currentUser;

    const dish = await this.dishesRepository.addDish(
      addDishDto,
      order,
      dishOwner,
      currentUser
    );

    return this.findOne(order, dish.id);
  }

  async delete(order: OrderEntity, id: number) {
    return await this.dishesRepository.delete({ id, order });
  }

  async update(
    order: OrderEntity,
    dishId: number,
    addDishDto: AddDishDto,
    createdBy: WorkspaceUserEntity
  ) {
    await this.validateSharesUsers(createdBy.workspaceId, addDishDto.shares);

    const dishOwner =
      (await this.usersRepository.findOne(addDishDto.userId)) ?? createdBy;

    const dish = await this.findOne(order, dishId);
    await this.dishesRepository.updateDish(
      addDishDto,
      dish,
      dishOwner,
      createdBy
    );

    return this.findOne(order, dish.id);
  }

  private async validateSharesUsers(workspaceId: number, shares: ShareDto[]) {
    const userIds = shares.map(({ workspaceUserId }) => workspaceUserId);
    const userCount = await this.usersRepository.count({
      where: { id: In(userIds), workspaceId },
    });
    const hasValidUsers = userCount === userIds.length;
    if (!hasValidUsers) {
      throw new HttpException('Invalid user id', HttpStatus.FORBIDDEN);
    }
  }
}
