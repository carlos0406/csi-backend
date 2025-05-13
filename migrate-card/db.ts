import 'reflect-metadata';

import { YuGiOhCardModel } from '../src/core/card/infra/card.model';
import { DataSource } from 'typeorm';

export const createDataSource = async () => {
  const dataSource = new DataSource({
    type: 'postgres',
    host: 'my_postgres_db',
    port: 5432,
    username: 'ygo',
    password: 'ygo',
    database: 'ygo',
    entities: [YuGiOhCardModel],
    synchronize: true,
  });

  return dataSource.initialize();
};

const dataSource = await createDataSource();

export const db = dataSource.getRepository(YuGiOhCardModel);
