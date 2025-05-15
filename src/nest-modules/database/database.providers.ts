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
      const dataSource = new DataSource({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
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
