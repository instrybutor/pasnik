import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from '../entities/order.entity';
import { OrdersRepository } from '../repositories/orders.repository';
import { UserEntity } from '../entities/user.entity';
import { CreateOrderDto } from '@pasnik/api/data-transfer';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(OrderEntity)
    private ordersRepository: OrdersRepository
  ) {}

  findAll() {
    return this.ordersRepository.find();
  }

  create(createOrderDto: CreateOrderDto, user: UserEntity) {
    return this.ordersRepository.createOrder(createOrderDto, user);
  }
}
