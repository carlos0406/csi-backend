import { purchaseOutputSchema } from './../domain/purchase.schema';
import { Repository } from 'typeorm';
import { PurchaseModel } from './purchase.model';

export class PurchaseRepository {
  constructor(private readonly repository: Repository<PurchaseModel>) {}
  async create(data: PurchaseModel) {
    const purchaseEntity = new PurchaseModel(data);
    return await this.repository.save(purchaseEntity);
  }
  async list(page: number = 1, limit: number = 10) {
    // listar com paginação
    const count = await this.repository.count();
    const purchases = await this.repository.find({
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      purchases: purchases.map((purchase) => this.toEntity(purchase)),
      total: count,
      page,
      totalPages: Math.ceil(count / limit),
    };
  }

  async findById(id: string) {
    return await this.repository.findOne({ where: { id } });
  }

  toEntity(purchase: PurchaseModel) {
    return purchaseOutputSchema.parse(purchase);
  }
}
