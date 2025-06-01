import { IRepository } from '../../shared/domain/repository';
import { RaritySchema } from './rarity.schema';
import { RarityModel } from '../infra/rarity.model';

export interface IRarityRepository extends IRepository {
  findAll(): Promise<RaritySchema[]>;
  parseRarities(rarities: RarityModel[]): RaritySchema[];
}
