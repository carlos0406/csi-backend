import { ShoppingListRepository } from '../infra/shopping_list.repository';

export class ListShoppingListByPurchaseUsecase {
  constructor(private readonly repository: ShoppingListRepository) {}

  async execute(purchaseId: string) {
    try {
      const shoppingList = await this.repository.searchByPurchaseId(purchaseId);
      if (shoppingList) {
        return shoppingList;
      } else {
        throw new Error('Shopping list not found');
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to get shopping list: ${error.message}`);
      } else {
        throw new Error('Failed to get shopping list: Unknown error');
      }
    }
  }
}
