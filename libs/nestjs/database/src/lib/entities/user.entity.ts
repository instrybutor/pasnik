import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserModel } from '@pasnik/api/data-transfer';
import { WorkspaceEntity } from './workspace.entity';

@Entity()
export class UserEntity implements UserModel {
  readonly kind = 'UserModel';

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

  @CreateDateColumn()
  lastNotificationDate: Date;

  @ManyToOne(() => WorkspaceEntity, {
    cascade: true,
    onDelete: 'SET NULL',
  })
  currentWorkspace: WorkspaceEntity;

  @Column({
    nullable: true,
  })
  currentWorkspaceId: number;
}
