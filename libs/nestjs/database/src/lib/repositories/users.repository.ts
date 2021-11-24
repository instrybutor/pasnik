import { EntityRepository, Repository } from 'typeorm';
import { UserEntity, WorkspaceEntity, WorkspaceUserEntity } from '../entities';
import { WorkspaceUserRole } from '@pasnik/api/data-transfer';

@EntityRepository(UserEntity)
export class UsersRepository extends Repository<UserEntity | undefined> {
  findByEmail(email: string, fail?: boolean) {
    if (fail) {
      return this.findOneOrFail({ where: { email } });
    }
    return this.findOne({ where: { email } });
  }

  async upsertUser({
    email,
    avatarImg,
    familyName,
    givenName,
    googleId,
    slackId,
  }: Pick<
    UserEntity,
    'email' | 'avatarImg' | 'familyName' | 'givenName' | 'googleId' | 'slackId'
  >) {
    const user = (await this.findByEmail(email)) ?? new UserEntity();
    user.googleId = googleId ?? user.googleId;
    user.slackId = slackId ?? user.slackId;
    user.avatarImg = avatarImg;
    user.email = email;
    user.givenName = givenName;
    user.familyName = familyName;
    if (!user.currentWorkspace) {
      const workspace = new WorkspaceEntity();
      const workspaceUser = new WorkspaceUserEntity();
      workspaceUser.user = user;
      workspaceUser.role = WorkspaceUserRole.Admin;
      workspace.name = 'Default';
      workspace.workspaceUsers = [workspaceUser];
      user.currentWorkspace = workspace;
    }
    await this.save(user);
    return this.findOne(user.id);
  }
}
