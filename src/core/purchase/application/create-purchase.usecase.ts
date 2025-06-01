import { ZodError } from 'zod';
import {
  purchaseInputSchema,
  PurchaseInputSchema,
} from '../domain/purchase.schema';
import { IPurchaseRepository } from '../domain/purchase.repository.interface';
import { PurchaseEntity } from '../domain/purchase.entity';

export class CreatePurchaseUsecase {
  constructor(private readonly repository: IPurchaseRepository) {}

  async execute(input: PurchaseInputSchema) {
    try {
      const parsedData = purchaseInputSchema.parse(input);
      const purchaseEntity = new PurchaseEntity(parsedData);
      return await this.repository.create(purchaseEntity);
    } catch (error) {
      if (error instanceof ZodError) {
        throw error;
      }
      if (error instanceof Error) {
        throw new Error(`Failed to create purchase: ${error.message}`);
      }
    }
  }
}
