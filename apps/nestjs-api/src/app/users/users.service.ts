import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from 'passport';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: string | number): Promise<User> {
    return this.usersRepository.findOne(id);
  }

  async removeUser(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async createUser(profile: Profile) {
    const user = await this.usersRepository.findOne({
      where: { googleId: profile.id },
    });
    if (user) {
      return this.findOne(user.id);
    }
    const newUser = new User();
    newUser.googleId = profile.id;
    await this.usersRepository.save(newUser);
    return this.findOne(newUser.id);
  }
}
