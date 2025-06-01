import { CreateShoppingListUsecase } from 'src/core/shopping_list/application/create_shopping_list.usecase';
import { GetFinalShoppingListByPurchaseIdUsecase } from 'src/core/shopping_list/application/get_final_shopping_list.usecase';
import { GetShoppingListByIdUsecase } from 'src/core/shopping_list/application/get_shopping_list_by_id.usecase';
import { GetShoppingListByUserIdUsecase } from 'src/core/shopping_list/application/get_shopping_list_by_user_id.usecase';
import { ListShoppingListByPurchaseUsecase } from 'src/core/shopping_list/application/list_shopping_list_by_purchase_id.usecase';
import { IShoppingListRepository } from 'src/core/shopping_list/domain/shopping_list.repository.interface';
import { ShoppingListModel } from 'src/core/shopping_list/infra/shopping_list.model';
import { ShoppingListRepository } from 'src/core/shopping_list/infra/shopping_list.repository';
import { DataSource } from 'typeorm';

export const ShoppingListProviders = [
  {
    provide: 'SHOPPING_LIST_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      new ShoppingListRepository(dataSource.getRepository(ShoppingListModel)),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'createShoppingListUsecase',
    useFactory: (repository: IShoppingListRepository) =>
      new CreateShoppingListUsecase(repository),
    inject: ['SHOPPING_LIST_REPOSITORY'],
  },
  {
    provide: 'getShoppingListByUserIdUsecase',
    useFactory: (repository: IShoppingListRepository) =>
      new GetShoppingListByUserIdUsecase(repository),
    inject: ['SHOPPING_LIST_REPOSITORY'],
  },
  {
    provide: 'getShoppingListByIdUsecase',
    useFactory: (repository: IShoppingListRepository) =>
      new GetShoppingListByIdUsecase(repository),
    inject: ['SHOPPING_LIST_REPOSITORY'],
  },

  {
    provide: 'getFinalShoppingListByPurchaseIdUsecase',
    useFactory: (repository: IShoppingListRepository) =>
      new GetFinalShoppingListByPurchaseIdUsecase(repository),
    inject: ['SHOPPING_LIST_REPOSITORY'],
  },
  {
    provide: 'listShoppingListByPurchaseUsecase',
    useFactory: (repository: IShoppingListRepository) =>
      new ListShoppingListByPurchaseUsecase(repository),
    inject: ['SHOPPING_LIST_REPOSITORY'],
  },
];
