import { IRepository } from '../../shared/domain/repository';
import { PurchaseModel } from '../infra/purchase.model';
import { PurchaseEntity } from './purchase.entity';
import { PurchaseOutputSchema } from './purchase.schema';

export interface IPurchaseRepository extends IRepository {
  create(entity: PurchaseEntity): Promise<{ id: string }>;
  list(
    page?: number,
    limit?: number,
  ): Promise<{
    data: PurchaseOutputSchema[];
    total: number;
    page: number;
    totalPages: number;
  }>;
  findById(id: string): Promise<PurchaseModel | null>;
  toEntity(purchase: PurchaseModel): PurchaseOutputSchema;
}
