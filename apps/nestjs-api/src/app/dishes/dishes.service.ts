import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ExpensesRepository,
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
    @InjectRepository(WorkspaceUsersRepository)
    private usersRepository: WorkspaceUsersRepository,
    @InjectRepository(ExpensesRepository)
    private expensesRepository: ExpensesRepository
  ) {}

  findAll(order: OrderEntity) {
    return this.expensesRepository.find({
      where: { operationId: order.operationId },
      order: {
        createdAt: 'ASC',
      },
    });
  }

  findOne(order: OrderEntity, id: number) {
    return this.expensesRepository.findOneOrFail({
      where: { operationId: order.operationId, id },
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

    const dish = await this.expensesRepository.addExpense(
      addDishDto,
      order,
      dishOwner,
      currentUser
    );

    return this.findOne(order, dish.id);
  }

  async delete(order: OrderEntity, id: number) {
    return await this.expensesRepository.delete({
      id,
      operationId: order.operationId,
    });
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
    await this.expensesRepository.updateExpense(
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
