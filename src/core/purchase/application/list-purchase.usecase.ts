import { IPurchaseRepository } from '../domain/purchase.repository.interface';

export class ListPurchaseUseCase {
  constructor(private purchaseRepository: IPurchaseRepository) {}
  async execute({ page, limit }: { page: number; limit: number }) {
    const purchases = await this.purchaseRepository.list(page, limit);
    return purchases;
  }
}
