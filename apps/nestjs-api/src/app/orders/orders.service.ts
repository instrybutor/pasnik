import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrdersRepository } from '../repositories/orders.repository';
import { UserEntity } from '../entities/user.entity';
import { CreateOrderDto, CreateDishBody, CreateDishDto } from '@pasnik/api/data-transfer';
import { DishesRepository } from '../repositories/dishes.repository';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(OrdersRepository)
    private ordersRepository: OrdersRepository,
    @InjectRepository(DishesRepository)
    private dishesRepository: DishesRepository
  ) {}

  findAll() {
    return this.ordersRepository.find();
  }

  findOne(id: string) {
    return this.ordersRepository.findOne(id, { relations: ['dishes', 'dishes.orderer'] });
  }

  create(createOrderDto: CreateOrderDto, user: UserEntity) {
    return this.ordersRepository.createOrder(createOrderDto, user);
  }

  async createDish(createDishDto: CreateDishDto, orderId: string, user: UserEntity) {
    if (!createDishDto || !createDishDto.name || !createDishDto.menu) {
      throw new HttpException('Provide all values!', 422);
    }
    const order = await this.ordersRepository.findOneOrFail(orderId);

    const newDishEntity = await this.dishesRepository.createDish(createDishDto, order, user);

    return newDishEntity;
  }
}
