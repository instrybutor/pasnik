import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import {
  OrdersRepository,
  UserEntity,
  WorkspaceEntity,
  WorkspacesRepository,
} from '@pasnik/nestjs/database';
import { CreateWorkspaceDto, OrderStatus } from '@pasnik/api/data-transfer';
import { sub } from 'date-fns';
import { Between } from 'typeorm';

@Injectable()
export class WorkspacesService {
  constructor(
    @InjectRepository(WorkspacesRepository)
    private workspaceRepository: WorkspacesRepository,
    @InjectRepository(OrdersRepository)
    private ordersRepository: OrdersRepository
  ) {}

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
