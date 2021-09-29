import { EntityRepository, Repository } from 'typeorm';
import { CreateDishDto } from '@pasnik/api/data-transfer';
import { DishEntity } from '../entities/dish.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { OrdersRepository } from './orders.repository';
import { OrderEntity } from '../entities/order.entity';
import { UserEntity } from '../entities/user.entity';

@EntityRepository(DishEntity)
export class DishesRepository extends Repository<DishEntity> {
  constructor(@InjectRepository(OrdersRepository) private ordersRepository: OrdersRepository) {
    super();
  }

  async createDish(createDishDto: CreateDishDto, order: OrderEntity, user: UserEntity) {
    const newDish = new DishEntity();
    newDish.name = createDishDto.name || 'default name';
    newDish.priceCents = createDishDto.priceCents || 0;
    newDish.order = order;
    newDish.orderer = user;
    newDish.createdAt = new Date();
    newDish.updatedAt = new Date();

    await this.save(newDish);

    return await this.findOneOrFail(newDish.id, { relations: ['orderer']});
  }
}
