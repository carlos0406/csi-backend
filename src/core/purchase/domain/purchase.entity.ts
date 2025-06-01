import { PurchaseInputSchema } from './purchase.schema';

export class PurchaseEntity {
  name: string;
  startDate: Date;
  endDate: Date;
  createdById: string;

  constructor(data: PurchaseInputSchema) {
    this.name = data.name;
    this.startDate = data.startDate;
    this.endDate = data.endDate;
    this.createdById = data.userId;
  }
}
