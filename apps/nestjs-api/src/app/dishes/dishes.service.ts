import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrdersRepository } from '../repositories/orders.repository';
import { UserEntity } from '@pasnik/nestjs/entities';
import { AddDishDto } from '@pasnik/api/data-transfer';
import { DishesRepository } from '../repositories/dishes.repository';

@Injectable()
export class DishesService {
  constructor(
    @InjectRepository(OrdersRepository)
    private ordersRepository: OrdersRepository,
    @InjectRepository(DishesRepository)
    private dishesRepository: DishesRepository
  ) {}

  findAll(orderId: string) {
    return this.dishesRepository.find({
      where: { orderId },
      relations: ['user'],
    });
  }

  findOne(orderId: string, id: number) {
    return this.dishesRepository.findOneOrFail({
      where: { orderId, id },
      relations: ['user'],
    });
  }

  async create(addDishDto: AddDishDto, orderId: string, user: UserEntity) {
    const order = await this.ordersRepository.findOneOrFail(orderId);
    const dish = await this.dishesRepository.addDish(addDishDto, order, user);

    return this.findOne(orderId, dish.id);
  }

  async delete(orderId: string, id: number) {
    return await this.dishesRepository.delete({ id, orderId });
  }

  async update(orderId: string, dishId: number, addDishDto: AddDishDto) {
    const dish = await this.findOne(orderId, dishId);
    await this.dishesRepository.updateDish(addDishDto, dish);

    return this.findOne(orderId, dish.id);
  }
}
