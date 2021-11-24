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
export class OrdersMiddleware implements NestMiddleware {
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
    const workspaceUser = await this.workspaceUsersRepository.findOne({
      where: { workspace: order.workspace, user },
      relations: ['workspace'],
    });

    if (!workspaceUser) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    res.locals.workspaceUser = workspaceUser;
    res.locals.order = order;

    next();
  }
}
