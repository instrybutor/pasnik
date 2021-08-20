import { Column, Entity, ManyToOne } from 'typeorm';
import { UserEntity } from './user.entity';
import { DishEntity } from './dish.entity';

@Entity()
export class UserDishEntity {
  @ManyToOne(() => UserEntity, { primary: true })
  user: UserEntity;
  @ManyToOne(() => DishEntity, (dish) => dish.usersDishes, { primary: true })
  dish: DishEntity;

  @Column()
  dishOwner: boolean;
}
