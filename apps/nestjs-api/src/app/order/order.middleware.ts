import { Request, Response } from 'express';
import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import {
  OrdersRepository,
  WorkspaceUsersRepository,
} from '@pasnik/nestjs/database';
import { HttpException } from '@nestjs/common/exceptions/http.exception';

interface OrdersParams {
  slug: string;
}

@Injectable()
export class OrderMiddleware implements NestMiddleware {
  constructor(
    private readonly workspaceUsersRepository: WorkspaceUsersRepository,
    private readonly ordersRepository: OrdersRepository
  ) {}
  async use(req: Request<OrdersParams>, res: Response, next: () => void) {
    const { user, params } = req;
    const { slug } = params;

    const order = await this.ordersRepository.findOne({
      where: { slug },
      relations: ['workspace'],
    });

    if (!order) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    const workspaceUser = await this.workspaceUsersRepository.findOne({
      where: { workspace: order.workspace, user, isRemoved: false },
      relations: ['workspace'],
    });

    if (!workspaceUser) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }

    res.locals.workspaceUser = workspaceUser;
    res.locals.order = order;

    next();
  }
}
