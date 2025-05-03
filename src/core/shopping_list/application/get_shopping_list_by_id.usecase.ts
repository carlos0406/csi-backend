import { ShoppingListRepository } from '../infra/shopping_list.repository';

export class GetShoppingListByIdUsecase {
  constructor(private readonly repository: ShoppingListRepository) {}

  async execute(id: string) {
    try {
      const shoppingList = await this.repository.findById(id);
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
