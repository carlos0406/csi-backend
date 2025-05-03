import {
  ShoppingListInput,
  shoppingListInputSchema,
} from '../domain/shopping_list.schema';
import { ShoppingListRepository } from '../infra/shopping_list.repository';

export class CreateShoppingListUsecase {
  constructor(private readonly repository: ShoppingListRepository) {}

  async execute(input: ShoppingListInput) {
    try {
      const parsedInput = shoppingListInputSchema.parse(input);
      return await this.repository.create(parsedInput);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to create shopping list: ${error.message}`);
      } else {
        throw new Error('Failed to create shopping list: Unknown error');
      }
    }
  }
}
