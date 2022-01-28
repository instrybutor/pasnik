import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  DishesRepository,
  OrderEntity,
  UserEntity,
  UsersRepository,
} from '@pasnik/nestjs/database';
import { AddDishDto } from '@pasnik/api/data-transfer';

@Injectable()
export class DishesService {
  constructor(
    @InjectRepository(DishesRepository)
    private dishesRepository: DishesRepository,
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository
  ) {}

  findAll(order: OrderEntity) {
    return this.dishesRepository.find({
      where: { order },
      relations: ['user'],
      order: {
        createdAt: 'ASC',
      },
    });
  }

  findOne(order: OrderEntity, id: number) {
    return this.dishesRepository.findOneOrFail({
      where: { order, id },
      relations: ['user'],
    });
  }

  async create(
    addDishDto: AddDishDto,
    order: OrderEntity,
    createdBy: UserEntity
  ) {
    const dishOwner =
      (await this.usersRepository.findOne(addDishDto.userId)) ?? createdBy;
    const dish = await this.dishesRepository.addDish(
      addDishDto,
      order,
      dishOwner,
      createdBy
    );

    return this.findOne(order, dish.id);
  }

  async delete(order: OrderEntity, id: number) {
    return await this.dishesRepository.delete({ id, order });
  }

  async update(
    order: OrderEntity,
    dishId: number,
    addDishDto: AddDishDto,
    createdBy: UserEntity
  ) {
    const dishOwner =
      (await this.usersRepository.findOne(addDishDto.userId)) ?? createdBy;

    const dish = await this.findOne(order, dishId);
    await this.dishesRepository.updateDish(
      addDishDto,
      dish,
      dishOwner,
      createdBy
    );

    return this.findOne(order, dish.id);
  }
}
