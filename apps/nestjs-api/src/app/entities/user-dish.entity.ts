import { Column, Entity, ManyToOne } from 'typeorm';
import { UserEntity } from './user.entity';
import { DishEntity } from './dish.entity';

@Entity()
export class UserDishEntity {
  @ManyToOne(() => UserEntity)
  user: UserEntity;
  @ManyToOne(() => DishEntity, (dish) => dish.usersDishes)
  dish: DishEntity;

  @Column()
  dishOwner: boolean;
}
