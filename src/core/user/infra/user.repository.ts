import { Repository } from 'typeorm';
import { UserEntity } from './user.model';
import { IUserRepository } from '../domain/user.repository.interface';

export class UserRepository implements IUserRepository {
  constructor(private readonly repository: Repository<UserEntity>) {}
  async searchByName() {
    return this.parseUsers(await this.repository.find());
  }

  parseUsers(cards: UserEntity[]) {
    return cards.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
    }));
  }
}
