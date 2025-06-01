import { ListRaritiesUsecase } from 'src/core/rarity/application/list_rarities.usecase';
import { IRarityRepository } from 'src/core/rarity/domain/rarity.repository.interface';
import { RarityModel } from 'src/core/rarity/infra/rarity.model';
import { RarityRepository } from 'src/core/rarity/infra/rarity.repository';
import { DataSource } from 'typeorm';

export const RarityProviders = [
  {
    provide: 'RARITY_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      new RarityRepository(dataSource.getRepository(RarityModel)),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'listRaritiesUsecase',
    useFactory: (repository: IRarityRepository) =>
      new ListRaritiesUsecase(repository),
    inject: ['RARITY_REPOSITORY'],
  },
];
