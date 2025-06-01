import {
  ShoppingListInput,
  shoppingListInputSchema,
} from '../domain/shopping_list.schema';
import { IShoppingListRepository } from '../domain/shopping_list.repository.interface';
import { ShoppingListEntity } from '../domain/shopping_list.entity';

export class CreateShoppingListUsecase {
  constructor(private readonly repository: IShoppingListRepository) {}

  async execute(input: ShoppingListInput) {
    try {
      const parsedInput = shoppingListInputSchema.parse(input);
      const shoppingListEntity = new ShoppingListEntity(parsedInput);
      return await this.repository.create(shoppingListEntity);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to create shopping list: ${error.message}`);
      } else {
        throw new Error('Failed to create shopping list: Unknown error');
      }
    }
  }
}
