import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import {
  OrderActionsRepository,
  OrdersRepository,
  UserEntity,
  UsersRepository,
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
  UpdateWorkspaceDto,
} from '@pasnik/api/data-transfer';
import { Connection } from 'typeorm';
import { HttpException } from '@nestjs/common/exceptions/http.exception';

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

  findUser(workspace: WorkspaceEntity, user: UserEntity) {
    return this.workspaceUsersRepository.findOneOrFail({
      where: { workspace, user },
      relations: ['user'],
    });
  }

  findUsers(workspace: WorkspaceEntity) {
    return this.workspaceUsersRepository.find({
      where: { workspace, isRemoved: false },
      relations: ['user'],
    });
  }

  findActiveOrders(workspace: WorkspaceEntity) {
    return this.ordersRepository
      .findAllActive(false)
      .andWhere('order.workspaceId = :workspaceId', {
        workspaceId: workspace.id,
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
        where: { user, isRemoved: false },
        relations: ['workspace'],
      })
      .then((workspaceUsers) => {
        return workspaceUsers.map((workspaceUser) => workspaceUser.workspace);
      });
  }

  findAll(): Promise<WorkspaceEntity[]> {
    return this.workspaceRepository.find();
  }

  findOneBySlug(slug: string): Promise<WorkspaceEntity> {
    return this.workspaceRepository.findOne({ where: { slug } });
  }

  findOne(id: string | number): Promise<WorkspaceEntity> {
    return this.workspaceRepository.findOne(id);
  }

  async update(
    workspace: WorkspaceEntity,
    updateWorkspaceDto: UpdateWorkspaceDto,
    user: WorkspaceUserEntity
  ) {
    await this.workspaceRepository.updateWorkspace(
      workspace,
      updateWorkspaceDto
    );
    return this.findOne(workspace.id);
  }

  async create(createWorkspaceDto: CreateWorkspaceDto, user: UserEntity) {
    return this.workspaceRepository.createWorkspace(createWorkspaceDto, user);
  }

  async removeWorkspace(workspace: WorkspaceEntity) {
    const { affected } = await this.workspaceRepository.delete({
      id: workspace.id,
    });
    if (affected === 1) {
      return workspace;
    }
    throw new HttpException('Not found', HttpStatus.NOT_FOUND);
  }

  async addMember(workspace: WorkspaceEntity, email: string) {
    return this.connection.transaction(async (manager) => {
      const usersRepository = manager.getCustomRepository(UsersRepository);
      const workspaceUsersRepository = manager.getCustomRepository(
        WorkspaceUsersRepository
      );

      const user = await usersRepository.findOneOrFail({ where: { email } });
      const workspaceUser = await workspaceUsersRepository.findOne({
        where: { user },
        relations: ['user'],
      });
      if (workspaceUser.isRemoved === false) {
        return workspaceUser;
      }
      const { id } = await workspaceUsersRepository.addMember(workspace, user);
      return workspaceUsersRepository.findOne(id, { relations: ['user'] });
    });
  }

  async removeMember(workspace: WorkspaceEntity, userId: number) {
    const workspaceUser = await this.workspaceUsersRepository.findOneOrFail({
      where: { workspace, userId, isRemoved: false },
    });
    return this.workspaceUsersRepository.removeMember(workspaceUser);
  }
}