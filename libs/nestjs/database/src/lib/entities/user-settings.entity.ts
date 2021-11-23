import { Column, Entity, ManyToOne, OneToOne } from 'typeorm';
import { WorkspaceEntity } from './workspace.entity';
import { UserEntity } from './user-slack-profile.entity';

@Entity()
export class UserSettingsEntity {
  @OneToOne(() => UserEntity, { primary: true })
  user: UserEntity;

  @ManyToOne(() => WorkspaceEntity, { nullable: false, onDelete: 'SET NULL' })
  currentWorkspace: WorkspaceEntity;

  @Column()
  currentWorkspaceId: number;
}
