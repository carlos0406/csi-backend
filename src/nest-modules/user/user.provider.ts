import { SearchUserUsecase } from 'src/core/user/application/search_user.usecase';
import { UserEntity } from 'src/core/user/infra/user.model';
import { UserRepository } from 'src/core/user/infra/user.repository';
import { DataSource } from 'typeorm';

export const UserProviders = [
  {
    provide: 'USER_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      new UserRepository(dataSource.getRepository(UserEntity)),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'searchUserUsecase',
    useFactory: (repository: UserRepository) =>
      new SearchUserUsecase(repository),
    inject: ['USER_REPOSITORY'],
  },
];
