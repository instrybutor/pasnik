import { EntityRepository, Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { Profile } from 'passport';

@EntityRepository(UserEntity)
export class UsersRepository extends Repository<UserEntity> {
  findByGoogleId(googleId: string) {
    return this.createQueryBuilder('user').where('uer.googleId = :googleId', {
      googleId,
    });
  }

  async createUser({ id, emails, photos, name }: Profile) {
    const user = (await this.findByGoogleId(id).getOne()) ?? new UserEntity();
    user.googleId = id;
    user.avatarImg = photos[0]?.value;
    user.email = emails[0].value;
    user.givenName = name.givenName;
    user.familyName = name.familyName;
    await this.save(user);
    return this.findOne(user.id);
  }
}
