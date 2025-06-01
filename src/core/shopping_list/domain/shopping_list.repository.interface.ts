import { IRepository } from '../../shared/domain/repository';
import { ShoppingListModel } from '../infra/shopping_list.model';
import { ShoppingListEntity } from './shopping_list.entity';

export interface IShoppingListRepository extends IRepository {
  create(entity: ShoppingListEntity): Promise<{ id: string }>;
  findByUserId(userId: string): Promise<ShoppingListModel[]>;
  findById(id: string): Promise<ShoppingListModel | null>;
  listWithCount(purchaseId: string): Promise<{
    purchase: {
      id: string;
      items: {
        card: { id: number; name: string };
        rarity: { id: string; name: string };
        collection: string;
        totalQuantity: number;
      }[];
    };
  }>;
  searchByPurchaseId(purchaseId: string): Promise<ShoppingListModel[]>;
}
