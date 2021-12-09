import { EntityRepository, Repository } from 'typeorm';
import { UserEntity, WorkspaceEntity, WorkspaceUserEntity } from '../entities';
import { WorkspacePrivacy, WorkspaceUserRole } from '@pasnik/api/data-transfer';
import slugify from 'slugify';
import { nanoid } from 'nanoid';

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
    if (!user.id) {
      const workspace = new WorkspaceEntity();
      const workspaceUser = new WorkspaceUserEntity();
      workspaceUser.user = user;
      workspaceUser.role = WorkspaceUserRole.Owner;
      workspace.name = 'Moja przestrzeń';
      workspace.workspaceUsers = [workspaceUser];
      workspace.privacy = WorkspacePrivacy.PrivateToYou;
      workspace.slug = slugify([workspace.name, nanoid(6)].join(' '), {
        lower: true,
      });
      user.currentWorkspace = workspace;
    }
    await this.save(user);
    return this.findOne(user.id);
  }
}
