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

  @Column({ nullable: true })
  givenName?: string;

  @Column({ nullable: true })
  familyName?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ nullable: true })
  googleId?: string | null;

  @Column({ nullable: true })
  slackId?: string | null;

  @Column()
  email: string;

  @Column({ nullable: true })
  avatarImg: string;

  @Column({ default: false })
  isAdmin: boolean;
}
