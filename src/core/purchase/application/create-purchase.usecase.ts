import {
  purchaseInputSchema,
  PurchaseInputSchema,
} from '../domain/purchase.schema';
import { PurchaseModel } from '../infra/purchase.model';
import { PurchaseRepository } from '../infra/purchase.repository';

export class CreatePurchaseUsecase {
  constructor(private readonly repository: PurchaseRepository) {}

  async execute(input: PurchaseInputSchema) {
    try {
      const parsedMode = purchaseInputSchema.parse(input);
      await this.repository.create(new PurchaseModel(parsedMode));
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to create purchase: ${error.message}`);
      } else {
        throw new Error('Failed to create purchase: Unknown error');
      }
    }
  }
}
