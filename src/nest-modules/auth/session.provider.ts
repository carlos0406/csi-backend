import { SessionEntity } from 'src/core/user/infra/user.model';
import { SessionRepository } from 'src/core/user/infra/user_session.repository';
import { DataSource } from 'typeorm';

export const SesssionProviders = [
  {
    provide: 'sessionRepository',
    useFactory: (dataSource: DataSource) =>
      new SessionRepository(dataSource.getRepository(SessionEntity)),
    inject: ['DATA_SOURCE'],
  },
];
