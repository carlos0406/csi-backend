import { Repository } from 'typeorm';
import { SessionEntity } from './user.model';
import { ISessionRepository } from '../domain/user_session.repository.interface';

export class SessionRepository implements ISessionRepository {
  constructor(private readonly repository: Repository<SessionEntity>) {}
  async findById(id: string): Promise<SessionEntity | null> {
    const result = await this.repository.findOne({
      where: { sessionToken: id },
      relations: ['user', 'user.roles'],
    });
    return result;
  }
}
