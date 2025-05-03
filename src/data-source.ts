import { DataSource } from 'typeorm';
import { YuGiOhCardModel } from './core/card/infra/card.model';
import { UserEntities } from './core/user/infra/user.model';
import { PurchaseModel } from './core/purchase/infra/purchase.model';
import {
  ShoppingListItemModel,
  ShoppingListModel,
} from './core/shopping_list/infra/shopping_list.model';
import { DbInit1745633606969 } from './migrations/1745633606969-db-init';

export const AppDataSource = new DataSource({
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
    ShoppingListModel,
    ShoppingListItemModel,
  ],
  migrations: [DbInit1745633606969],
  synchronize: false,
});
