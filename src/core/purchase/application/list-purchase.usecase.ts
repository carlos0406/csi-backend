import { IPurchaseRepository } from '../domain/purchase.repository.interface';

export class ListPurchaseUseCase {
  constructor(private purchaseRepository: IPurchaseRepository) {}
  async execute({
    page,
    limit,
    onlyActive,
  }: {
    page: number;
    limit: number;
    onlyActive?: boolean;
  }) {
    const purchases = await this.purchaseRepository.list(
      page,
      limit,
      onlyActive,
    );
    return purchases;
  }
}
