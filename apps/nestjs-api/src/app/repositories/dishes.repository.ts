import { EntityRepository, Repository } from 'typeorm';
import { OrderEntity } from '../entities/order.entity';
import { AddDishDto } from '@pasnik/api/data-transfer';
import { UserEntity } from '../entities/user.entity';
import { DishEntity } from '../entities/dish.entity';

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
