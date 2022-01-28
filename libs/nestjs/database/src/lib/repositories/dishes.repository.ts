import { EntityRepository, Repository } from 'typeorm';
import { AddDishDto } from '@pasnik/api/data-transfer';
import { DishEntity, OrderEntity, UserEntity } from '../entities';

@EntityRepository(DishEntity)
export class DishesRepository extends Repository<DishEntity> {
  async addDish(
    addDishDto: AddDishDto,
    order: OrderEntity,
    user: UserEntity,
    createdBy: UserEntity
  ) {
    const dish = new DishEntity();

    dish.order = order;
    dish.name = addDishDto.name;
    dish.priceCents = addDishDto.priceCents;
    dish.createdBy = createdBy;
    dish.user = user;

    return this.save(dish);
  }

  async updateDish(
    addDishDto: AddDishDto,
    dish: DishEntity,
    user: UserEntity,
    createdBy: UserEntity
  ) {
    dish.name = addDishDto.name;
    dish.priceCents = addDishDto.priceCents;
    dish.user = user;
    dish.createdBy = createdBy;

    return this.save(dish);
  }
}
