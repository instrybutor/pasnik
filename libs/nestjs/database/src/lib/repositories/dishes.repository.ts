import { EntityRepository, Repository } from 'typeorm';
import { AddDishDto } from '@pasnik/api/data-transfer';
import { DishEntity, OrderEntity, UserEntity } from '../entities';

@EntityRepository(DishEntity)
export class DishesRepository extends Repository<DishEntity> {
  async addDish(
    addDishDto: AddDishDto,
    order: OrderEntity,
    user: UserEntity,
    currentUser: UserEntity
  ) {
    const dish = new DishEntity();

    dish.order = order;
    dish.name = addDishDto.name;
    dish.priceCents = addDishDto.priceCents;
    dish.createdBy = currentUser;
    dish.user = user;

    return this.save(dish);
  }

  async updateDish(
    addDishDto: AddDishDto,
    dish: DishEntity,
    user: UserEntity,
    currentUser: UserEntity
  ) {
    dish.name = addDishDto.name;
    dish.priceCents = addDishDto.priceCents;
    dish.user = user;
    dish.createdBy = currentUser;

    return this.save(dish);
  }
}
