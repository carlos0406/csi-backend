import { PurchaseRepository } from '../infra/purchase.repository';

export class ListPurchaseUseCase {
  constructor(private purchaseRepository: PurchaseRepository) {}
  async execute({ page, limit }: { page: number; limit: number }) {
    const purchases = await this.purchaseRepository.list(page, limit);
    return purchases;
  }
}
