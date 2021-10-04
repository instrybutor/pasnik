import { EntityRepository, Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { Profile } from 'passport';

@EntityRepository()
export class UsersRepository extends Repository<UserEntity> {
  findByGoogleId(googleId: string) {
    return this.createQueryBuilder('user').where('uer.googleId = :googleId', {
      googleId,
    });
  }

  async createUser({ id, emails, photos }: Profile) {
    const user = (await this.findByGoogleId(id).getOne()) ?? new UserEntity();
    user.googleId = id;
    console.log(photos);
    user.avatarImg = photos[0]?.value;
    user.email = emails[0].value;
    await this.save(user);
    return this.findOne(user.id);
  }
}
