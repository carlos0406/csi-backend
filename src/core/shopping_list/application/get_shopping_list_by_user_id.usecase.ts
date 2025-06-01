import { IShoppingListRepository } from '../domain/shopping_list.repository.interface';

export class GetShoppingListByUserIdUsecase {
  constructor(private readonly repository: IShoppingListRepository) {}

  async execute(userId: string) {
    try {
      const shoppingList = await this.repository.findByUserId(userId);
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
