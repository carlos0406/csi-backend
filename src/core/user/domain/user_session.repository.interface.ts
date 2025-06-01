import { IRepository } from '../../shared/domain/repository';
import { SessionEntity } from '../infra/user.model';

export interface ISessionRepository extends IRepository {
  findById(id: string): Promise<SessionEntity | null>;
}
