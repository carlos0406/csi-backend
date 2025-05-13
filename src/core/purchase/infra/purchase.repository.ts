import { purchaseOutputSchema } from './../domain/purchase.schema';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { PurchaseModel } from './purchase.model';

export class PurchaseRepository {
  constructor(private readonly repository: Repository<PurchaseModel>) {}
  async create(data: PurchaseModel) {
    const purchaseEntity = new PurchaseModel(data);
    const { id } = await this.repository.save(purchaseEntity);
    return { id };
  }
  async list(page: number = 1, limit: number = 9999) {
    const where = {
      endDate: MoreThanOrEqual(new Date()),
    };
    const count = await this.repository.count({
      where,
    });
    const purchases = await this.repository.find({
      where,
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      data: purchases.map((purchase) => this.toEntity(purchase)),
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
