import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { OrderEntity } from '@pasnik/nestjs/database';

export const CurrentOrder = createParamDecorator<OrderEntity>(
  (data: unknown, ctx: ExecutionContext): OrderEntity => {
    const response = ctx.switchToHttp().getResponse();
    return response.locals.order;
  }
);
