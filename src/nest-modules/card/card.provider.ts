import { SearchCardUsecase } from 'src/core/card/application/search_card.usecase';
import { ICardRepository } from 'src/core/card/domain/card.repository.interface';
import { YuGiOhCardModel } from 'src/core/card/infra/card.model';
import { CardRepository } from 'src/core/card/infra/card.repository';
import { DataSource } from 'typeorm';

export const CardProviders = [
  {
    provide: 'CARD_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      new CardRepository(dataSource.getRepository(YuGiOhCardModel)),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'searchCardUsecase',
    useFactory: (repository: ICardRepository) =>
      new SearchCardUsecase(repository),
    inject: ['CARD_REPOSITORY'],
  },
];
