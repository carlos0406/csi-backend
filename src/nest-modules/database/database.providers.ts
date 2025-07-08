import { YuGiOhCardModel } from 'src/core/card/infra/card.model';
import { PurchaseModel } from 'src/core/purchase/infra/purchase.model';
import { UserEntities } from 'src/core/user/infra/user.model';
import { DataSource } from 'typeorm';
import {
  ShoppingListItemModel,
  ShoppingListModel,
} from 'src/core/shopping_list/infra/shopping_list.model';
import { RarityModel } from 'src/core/rarity/infra/rarity.model';
import { ConfigSchema } from '../config_module/config.module';
import { ConfigService } from '@nestjs/config';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    inject: [ConfigService],
    useFactory: async (configService: ConfigService<ConfigSchema>) => {
      const host = configService.get('DB_HOST');
      const port = configService.get('DB_PORT');
      const username = configService.get('DB_USER');
      const password = configService.get('DB_PASSWORD');
      const database = configService.get('DB_NAME');

      console.log('Database config:', {
        host,
        port,
        username,
        password,
        database,
      });

      const dataSource = new DataSource({
        type: 'postgres',
        host,
        port,
        username,
        password,
        database,
        entities: [
          YuGiOhCardModel,
          ...UserEntities,
          PurchaseModel,
          ShoppingListItemModel,
          ShoppingListModel,
          RarityModel,
        ],
        synchronize: false,
      });

      return dataSource.initialize();
    },
  },
];
