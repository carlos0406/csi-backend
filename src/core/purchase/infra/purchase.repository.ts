import { purchaseOutputSchema } from './../domain/purchase.schema';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { PurchaseModel } from './purchase.model';
import { IPurchaseRepository } from '../domain/purchase.repository.interface';
import { PurchaseEntity } from '../domain/purchase.entity';

export class PurchaseRepository implements IPurchaseRepository {
  constructor(private readonly repository: Repository<PurchaseModel>) {}
  async create(entity: PurchaseEntity) {
    const purchaseModel = new PurchaseModel({
      name: entity.name,
      startDate: entity.startDate,
      endDate: entity.endDate,
      createdById: entity.createdById,
    });
    const { id } = await this.repository.save(purchaseModel);
    return { id };
  }

  async list(page: number = 1, limit: number = 9999) {
    // const where = {
    //   endDate: MoreThanOrEqual(new Date()),
    // };
    const count = await this.repository.count({
      // where,
    });
    const purchases = await this.repository.find({
      // where,
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
