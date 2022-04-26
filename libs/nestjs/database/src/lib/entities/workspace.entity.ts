import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { WorkspaceModel, WorkspacePrivacy } from '@pasnik/api/data-transfer';
import { WorkspaceUserEntity } from './workspace-user.entity';

@Entity()
export class WorkspaceEntity implements WorkspaceModel {
  readonly kind = 'WorkspaceModel';

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  slug: string;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  @Column()
  name: string;

  @OneToMany(() => WorkspaceUserEntity, ({ workspace }) => workspace, {
    cascade: true,
  })
  workspaceUsers: WorkspaceUserEntity[];

  @Column({ type: 'varchar' })
  privacy: WorkspacePrivacy;
}
