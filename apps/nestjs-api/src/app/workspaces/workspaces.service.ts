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
import { sub } from 'date-fns';
import { Between, Connection } from 'typeorm';

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

  findActiveOrders(workspace: WorkspaceEntity) {
    const now = new Date();
    const yesterday = sub(now, { days: 1 });
    return this.ordersRepository.find({
      where: [
        { status: OrderStatus.InProgress, workspace },
        { status: OrderStatus.Ordered, workspace },
        {
          status: OrderStatus.Delivered,
          deliveredAt: Between(yesterday, now),
          workspace,
        },
      ],
      relations: ['user'],
    });
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
