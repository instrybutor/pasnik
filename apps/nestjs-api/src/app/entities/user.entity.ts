import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserModel } from '@pasnik/api/data-transfer';

@Entity()
export class UserEntity implements UserModel {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  googleId: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  avatarImg: string;
}
