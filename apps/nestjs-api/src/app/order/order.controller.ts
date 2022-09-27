import { Body, Controller, Get, Post, Put } from '@nestjs/common';

import {
  OrderEntity,
  UserEntity,
  WorkspaceUserEntity,
} from '@pasnik/nestjs/database';
import {
  AddPayerToOrderDto,
  MarkAsDeliveredDto,
  MarkAsOrderedDto,
  SetETADto,
  UpdateOrderDto,
} from '@pasnik/api/data-transfer';
import { CurrentUser } from '@pasnik/nestjs/auth';

import { OrderService } from './order.service';
import { CurrentOrder } from './current-order.decorator';
import { CurrentAbility } from '../app-ability';
import { AppAbility, OrdersAction } from '@pasnik/ability';
import { ForbiddenError } from '@casl/ability';
import { PaymentsService } from '../payments/payments.service';
import { CurrentWorkspaceUser } from '../workspaces/current-workspace-user.decorator';

@Controller('orders/slug/:slug')
export class OrderController {
  constructor(
    private readonly ordersService: OrderService,
    private readonly paymentsService: PaymentsService
  ) {}

  @Get()
  findOne(
    @CurrentOrder() order: OrderEntity,
    @CurrentAbility() ability: AppAbility
  ) {
    ForbiddenError.from(ability).throwUnlessCan(OrdersAction.Read, order);

    return this.ordersService.findOneById(order.id);
  }

  @Put()
  update(
    @CurrentOrder() order: OrderEntity,
    @Body() payload: UpdateOrderDto,
    @CurrentAbility() ability: AppAbility
  ) {
    ForbiddenError.from(ability).throwUnlessCan(OrdersAction.Update, order);
    return this.ordersService.update(order, payload);
  }

  @Post('/mark-as-ordered')
  markAsOrdered(
    @CurrentOrder() order: OrderEntity,
    @Body() markAsOrderedDto: MarkAsOrderedDto,
    @CurrentUser() user: UserEntity,
    @CurrentAbility() ability: AppAbility
  ) {
    ForbiddenError.from(ability).throwUnlessCan(
      OrdersAction.MarkAsOrdered,
      order
    );
    return this.ordersService.markAsOrdered(order.id, markAsOrderedDto, user);
  }

  @Post('/mark-as-closed')
  markAsClosed(
    @CurrentOrder() order: OrderEntity,
    @CurrentUser() user: UserEntity,
    @CurrentAbility() ability: AppAbility
  ) {
    ForbiddenError.from(ability).throwUnlessCan(
      OrdersAction.MarkAsClosed,
      order
    );
    return this.ordersService.markAsClosed(order.id, user);
  }

  @Post('/mark-as-open')
  markAsOpen(
    @CurrentOrder() order: OrderEntity,
    @CurrentUser() user: UserEntity,
    @CurrentAbility() ability: AppAbility
  ) {
    ForbiddenError.from(ability).throwUnlessCan(OrdersAction.MarkAsOpen, order);
    return this.ordersService.markAsOpen(order.id, user);
  }

  @Post('/set-eta')
  setEta(
    @CurrentOrder() order: OrderEntity,
    @CurrentUser() user: UserEntity,
    @CurrentAbility() ability: AppAbility,
    @Body() setETADto: SetETADto
  ) {
    ForbiddenError.from(ability).throwUnlessCan(OrdersAction.SetETA, order);

    return this.ordersService.setETA(order.id, setETADto);
  }

  @Post('/mark-as-delivered')
  markAsDelivered(
    @CurrentOrder() order: OrderEntity,
    @CurrentWorkspaceUser() user: WorkspaceUserEntity,
    @CurrentAbility() ability: AppAbility,
    @Body() markAsDeliveredDto: MarkAsDeliveredDto
  ) {
    ForbiddenError.from(ability).throwUnlessCan(
      OrdersAction.MarkAsDelivered,
      order
    );
    return this.ordersService.markAsDelivered(
      order.id,
      markAsDeliveredDto,
      user
    );
  }

  @Post('/mark-as-processing')
  markAsProcessing(
    @CurrentOrder() order: OrderEntity,
    @CurrentUser() user: UserEntity,
    @CurrentAbility() ability: AppAbility
  ) {
    ForbiddenError.from(ability).throwUnlessCan(
      OrdersAction.MarkAsProcessing,
      order
    );
    return this.ordersService.markAsProcessing(order.id, user);
  }

  @Get('/payments')
  getPayments(
    @CurrentOrder() order: OrderEntity,
    @CurrentAbility() ability: AppAbility
  ) {
    return this.paymentsService.findAllForSource(order.operation);
  }

  @Put('/payments')
  addPayment(
    @Body() addPaymentDto: AddPayerToOrderDto,
    @CurrentOrder() order: OrderEntity,
    @CurrentAbility() ability: AppAbility,
    @CurrentWorkspaceUser() currentWorkspaceUser: WorkspaceUserEntity
  ) {
    ForbiddenError.from(ability).throwUnlessCan(OrdersAction.SetPayer, order);
    return this.ordersService.addPayerToOrder(
      order,
      currentWorkspaceUser,
      addPaymentDto
    );
  }
}
