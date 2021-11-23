import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserModel } from '@pasnik/api/data-transfer';
import { UserProfileEntity } from './user-slack-profile.entity';
import { UserSettingsEntity } from './user-settings.entity';

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

  @Column()
  email: string;

  @Column({ nullable: true })
  avatarImg: string;

  @Column({ default: false })
  isAdmin: boolean;

  @OneToMany(() => UserProfileEntity, (profile) => profile.user)
  profiles: UserProfileEntity;

  @OneToOne(() => UserSettingsEntity, { nullable: false })
  settings: UserSettingsEntity;
}
