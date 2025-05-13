import { Repository } from 'typeorm';
import { SessionEntity } from './user.model';

export class SessionRepository {
  constructor(private readonly repository: Repository<SessionEntity>) {}
  async findById(id: string): Promise<SessionEntity | null> {
    const result = await this.repository.findOne({
      where: { sessionToken: id },
      relations: ['user', 'user.roles'],
    });
    return result;
  }
}
