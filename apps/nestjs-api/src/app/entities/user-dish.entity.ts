import { Column, Entity, ManyToOne } from 'typeorm';
import { UserEntity } from './user.entity';
import { DishEntity } from './dish.entity';
import { UserDishModel } from '@pasnik/api/data-transfer';

@Entity()
export class UserDishEntity implements UserDishModel {
  @ManyToOne(() => UserEntity, { primary: true, onDelete: "SET NULL" })
  user: UserEntity;
  @ManyToOne(() => DishEntity, (dish) => dish.usersDishes, { primary: true, onDelete: "CASCADE" })
  dish: DishEntity;

  @Column()
  dishOwner: boolean;
}
