import { IShoppingListRepository } from '../domain/shopping_list.repository.interface';

export class GetFinalShoppingListByPurchaseIdUsecase {
  constructor(private readonly repository: IShoppingListRepository) {}

  async execute(purchaseId: string) {
    try {
      const shoppingList = await this.repository.listWithCount(purchaseId);
      if (!shoppingList) throw new Error('Shopping list not found');
      return shoppingList;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to get shopping list: ${error.message}`);
      } else {
        throw new Error('Failed to get shopping list: Unknown error');
      }
    }
  }
}
