import { YuGiOhCardModel } from 'src/core/card/infra/card.model';
import { PurchaseModel } from 'src/core/purchase/infra/purchase.model';
import { UserEntities } from 'src/core/user/infra/user.model';
import { DataSource } from 'typeorm';
import {
  ShoppingListItemModel,
  ShoppingListModel,
} from 'src/core/shopping_list/infra/shopping_list.model';
import { RarityModel } from 'src/core/rarity/infra/rarity.model';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'ygo',
        password: 'ygo',
        database: 'ygo',
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
