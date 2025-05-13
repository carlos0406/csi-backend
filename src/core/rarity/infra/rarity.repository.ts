import { Repository } from 'typeorm';
import { RarityModel } from './rarity.model';
import { raritySchema, RaritySchema } from '../domain/rarity.schema';

export class RarityRepository {
  constructor(private readonly repository: Repository<RarityModel>) {}

  async findAll(): Promise<RaritySchema[]> {
    return this.parseRarities(await this.repository.find());
  }

  parseRarities(rarities: RarityModel[]) {
    try {
      return rarities.map((rarity) => raritySchema.parse(rarity));
    } catch (error) {
      throw new Error(`Error parsing rarities: ${error}`);
    }
  }
}
