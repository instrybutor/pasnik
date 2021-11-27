import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import {
  OrderActionsRepository,
  OrdersRepository,
  UserEntity,
  WorkspaceEntity,
  WorkspacesRepository,
  WorkspaceUserEntity,
  WorkspaceUsersRepository,
} from '@pasnik/nestjs/database';
import {
  CreateOrderDto,
  CreateWorkspaceDto,
  OrderAction,
  OrderStatus,
} from '@pasnik/api/data-transfer';
import { Brackets, Connection } from 'typeorm';
import { sub } from 'date-fns';

@Injectable()
export class WorkspacesService {
  constructor(
    @InjectRepository(WorkspacesRepository)
    private workspaceRepository: WorkspacesRepository,
    @InjectRepository(WorkspaceUsersRepository)
    private workspaceUsersRepository: WorkspaceUsersRepository,
    @InjectRepository(OrdersRepository)
    private ordersRepository: OrdersRepository,
    private connection: Connection
  ) {}

  async createOrder(
    createOrderDto: CreateOrderDto,
    { user, workspace }: WorkspaceUserEntity
  ) {
    return await this.connection.transaction(async (manager) => {
      const ordersRepository = manager.getCustomRepository(OrdersRepository);
      const orderActionsRepository = manager.getCustomRepository(
        OrderActionsRepository
      );

      const order = await ordersRepository.createOrder(
        createOrderDto,
        workspace,
        user
      );
      await orderActionsRepository.createAction(
        user,
        order,
        OrderAction.Created
      );

      return order;
    });
  }

  findUsers(workspace: WorkspaceEntity) {
    return this.workspaceUsersRepository.find({
      where: { workspace },
    });
  }

  findActiveOrders(workspace: WorkspaceEntity) {
    const now = new Date();
    const yesterday = sub(now, { days: 1 });

    return this.ordersRepository
      .createQueryBuilder('order')
      .leftJoin('order.dishes', 'dish', 'dish.orderId = order.id')
      .leftJoinAndMapOne(
        'order.user',
        UserEntity,
        'user',
        'user.id = order.userId'
      )
      .leftJoinAndMapMany(
        'order.participants',
        UserEntity,
        'participant',
        'dish.userId = participant.id'
      )
      .where('order.workspaceId = :workspaceId')
      .andWhere(
        new Brackets((db) => {
          db.where(`order.status = '${OrderStatus.InProgress}'`)
            .orWhere(`order.status = '${OrderStatus.Ordered}'`)
            .orWhere(
              `(order.status = '${OrderStatus.Delivered}' AND order.deliveredAt BETWEEN :startDate AND :endDate)`
            );
        })
      )
      .addSelect('SUM(dish.priceCents)', 'order_totalPrice')
      .groupBy('order.id')
      .addGroupBy('user.id')
      .addGroupBy('participant.id')
      .setParameters({
        workspaceId: workspace.id,
        startDate: yesterday,
        endDate: now,
      })
      .getMany();
  }

  findInactiveOrders(workspace: WorkspaceEntity) {
    return this.ordersRepository.find({
      where: [
        { status: OrderStatus.Canceled, workspace },
        { status: OrderStatus.Delivered, workspace },
      ],
      relations: ['user'],
    });
  }

  findAllForUser(user: UserEntity) {
    return this.workspaceUsersRepository
      .find({
        where: { user },
        relations: ['workspace'],
      })
      .then((workspaceUsers) => {
        return workspaceUsers.map((workspaceUser) => workspaceUser.workspace);
      });
  }

  findAll(): Promise<WorkspaceEntity[]> {
    return this.workspaceRepository.find();
  }

  findOne(id: string | number): Promise<WorkspaceEntity> {
    return this.workspaceRepository.findOne(id);
  }

  async create(createWorkspaceDto: CreateWorkspaceDto, user: UserEntity) {
    return this.workspaceRepository.createWorkspace(createWorkspaceDto, user);
  }

  async removeWorkspace(id: string): Promise<void> {
    await this.workspaceRepository.delete(id);
  }
}
