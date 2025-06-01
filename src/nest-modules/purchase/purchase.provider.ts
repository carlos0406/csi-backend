import { CreatePurchaseUsecase } from 'src/core/purchase/application/create-purchase.usecase';
import { ListPurchaseUseCase } from 'src/core/purchase/application/list-purchase.usecase';
import { IPurchaseRepository } from 'src/core/purchase/domain/purchase.repository.interface';
import { PurchaseModel } from 'src/core/purchase/infra/purchase.model';
import { PurchaseRepository } from 'src/core/purchase/infra/purchase.repository';
import { DataSource } from 'typeorm';

export const PurchaseProviders = [
  {
    provide: 'PURCHASE_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      new PurchaseRepository(dataSource.getRepository(PurchaseModel)),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'createPurchaseUsecase',
    useFactory: (repository: IPurchaseRepository) =>
      new CreatePurchaseUsecase(repository),
    inject: ['PURCHASE_REPOSITORY'],
  },
  {
    provide: 'listPurchaseUsecase',
    useFactory: (repository: IPurchaseRepository) =>
      new ListPurchaseUseCase(repository),
    inject: ['PURCHASE_REPOSITORY'],
  },
];
