import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import {
  OrderActionsRepository,
  OrdersRepository,
  UserEntity,
  UsersRepository,
  WorkspaceAccessRequestsRepository,
  WorkspaceEntity,
  WorkspacesRepository,
  WorkspaceUserEntity,
  WorkspaceUsersRepository,
} from '@pasnik/nestjs/database';
import {
  AddMembersToWorkspaceDto,
  CreateOrderDto,
  CreateWorkspaceDto,
  OrderAction,
  OrderStatus,
  UpdateWorkspaceDto,
} from '@pasnik/api/data-transfer';
import { Connection, In } from 'typeorm';
import { HttpException } from '@nestjs/common/exceptions/http.exception';

@Injectable()
export class WorkspacesService {
  constructor(
    @InjectRepository(WorkspaceAccessRequestsRepository)
    private workspaceAccessRequestsRepository: WorkspaceAccessRequestsRepository,
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

  findUserById(workspaceUserId: number | string) {
    return this.workspaceUsersRepository.findOneOrFail(workspaceUserId, {
      relations: ['user'],
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
        where: { userId: user.id, isRemoved: false },
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
    updateWorkspaceDto: UpdateWorkspaceDto
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

  async addMembers(
    workspace: WorkspaceEntity,
    { members }: AddMembersToWorkspaceDto
  ) {
    const emails = members.map((member) => member.email);
    return this.connection.transaction(async (manager) => {
      const usersRepository = manager.getCustomRepository(UsersRepository);
      const workspaceUsersRepository = manager.getCustomRepository(
        WorkspaceUsersRepository
      );
      const workspaceAccessRequestsRepository = manager.getCustomRepository(
        WorkspaceAccessRequestsRepository
      );

      const users = await usersRepository.find({
        where: { email: In(emails) },
      });
      const workspaceUsers = await workspaceUsersRepository.find({
        where: { user: In(users) },
      });
      const filteredUsers = users.filter(
        (user) =>
          !workspaceUsers.some(
            (workspaceUser) => workspaceUser.userId === user.id
          )
      );

      await workspaceAccessRequestsRepository.delete({
        user: { email: In(emails) },
      });
      await Promise.all(
        filteredUsers.map((user) =>
          workspaceUsersRepository.addMember(workspace, user)
        )
      );

      return await this.findUsers(workspace);
    });
  }

  async removeMember(workspaceUser: WorkspaceUserEntity) {
    return this.workspaceUsersRepository.removeMember(workspaceUser);
  }

  async joinWorkspace(workspace: WorkspaceEntity, user: UserEntity) {}

  async requestAccess(workspace: WorkspaceEntity, user: UserEntity) {
    const requestAccess = await this.workspaceAccessRequestsRepository.findOne({
      where: { workspace, user },
    });
    if (requestAccess) {
      return;
    }
    return await this.workspaceAccessRequestsRepository.createAccessRequest(
      workspace,
      user
    );
  }

  async findAccessRequest(workspace: WorkspaceEntity, user: UserEntity) {
    return await this.workspaceAccessRequestsRepository.findOne({
      where: { workspace, user },
    });
  }

  async findAccessRequests(workspace: WorkspaceEntity) {
    return await this.workspaceAccessRequestsRepository.find({
      where: { workspace },
      relations: ['user'],
    });
  }
}
