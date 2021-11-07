import { EntityRepository, Repository } from 'typeorm';
import { UserEntity } from '../entities';

@EntityRepository(UserEntity)
export class UsersRepository extends Repository<UserEntity> {
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
    await this.save(user);
    return this.findOne(user.id);
  }
}
