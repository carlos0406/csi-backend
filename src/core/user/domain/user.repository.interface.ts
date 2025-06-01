import { IRepository } from '../../shared/domain/repository';
import { UserEntity } from '../infra/user.model';

export interface IUserRepository extends IRepository {
  searchByName(): Promise<{ id: string; name: string; email: string }[]>;
  parseUsers(users: UserEntity[]): { id: string; name: string; email: string }[];
}
