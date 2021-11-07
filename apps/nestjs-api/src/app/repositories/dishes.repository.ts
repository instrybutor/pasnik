import { EntityRepository, Repository } from 'typeorm';
import { DishEntity, OrderEntity, UserEntity } from '@pasnik/nestjs/entities';
import { AddDishDto } from '@pasnik/api/data-transfer';

@EntityRepository(DishEntity)
export class DishesRepository extends Repository<DishEntity> {
  async addDish(addDishDto: AddDishDto, order: OrderEntity, user: UserEntity) {
    const dish = new DishEntity();

    dish.order = order;
    dish.name = addDishDto.name;
    dish.priceCents = addDishDto.priceCents;
    dish.user = user;

    return this.save(dish);
  }

  async updateDish(addDishDto: AddDishDto, dish: DishEntity) {
    dish.name = addDishDto.name;
    dish.priceCents = addDishDto.priceCents;

    return this.save(dish);
  }
}
