import { DataSource } from 'typeorm';
import { YuGiOhCardModel } from './core/card/infra/card.model';
import { UserEntities } from './core/user/infra/user.model';
import { PurchaseModel } from './core/purchase/infra/purchase.model';
import {
  ShoppingListItemModel,
  ShoppingListModel,
} from './core/shopping_list/infra/shopping_list.model';
import { DbInit1745633606969 } from './migrations/1745633606969-db-init';
import { RarityModel } from './core/rarity/infra/rarity.model';
import { CreateRarity1746754500388 } from './migrations/1746754500388-create-rarity';
import { InsertRarities1746754893916 } from './migrations/1746754893916-insert-rarities';
import { UseRarity1746848393655 } from './migrations/1746848393655-use-rarity';
import { CreateUserRole1747099797726 } from './migrations/1747099797726-create-user-role';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  //host: 'my_postgres_db',
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
    RarityModel,
  ],
  migrations: [
    DbInit1745633606969,
    CreateRarity1746754500388,
    InsertRarities1746754893916,
    UseRarity1746848393655,
    CreateUserRole1747099797726,
  ],
  synchronize: false,
});
