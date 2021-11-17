import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { WorkspaceModel } from '@pasnik/api/data-transfer';
import { WorkspaceUserEntity } from './workspace-user.entity';

@Entity()
export class WorkspaceEntity implements WorkspaceModel {
  @PrimaryGeneratedColumn()
  id: string;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  @Column()
  name: string;

  @OneToMany(() => WorkspaceUserEntity, ({ workspace }) => workspace)
  workspaceUsers: WorkspaceUserEntity[];
}
