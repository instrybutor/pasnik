import { EntityRepository, Repository } from 'typeorm';
import { UserEntity } from '@pasnik/nestjs/entities';
import { Profile } from 'passport';

@EntityRepository(UserEntity)
export class UsersRepository extends Repository<UserEntity> {
  findByGoogleId(googleId: string) {
    return this.findOne({ where: { googleId } });
  }

  async upsertGoogleUser({ id, emails, photos, name }: Profile) {
    const user = (await this.findByGoogleId(id)) ?? new UserEntity();
    user.googleId = id;
    user.avatarImg = photos[0]?.value;
    user.email = emails[0].value;
    user.givenName = name.givenName;
    user.familyName = name.familyName;
    await this.save(user);
    return this.findOne(user.id);
  }
}
