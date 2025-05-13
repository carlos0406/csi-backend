import { RaritySchema } from '../domain/rarity.schema';
import { RarityRepository } from '../infra/rarity.repository';

export class ListRaritiesUsecase {
  constructor(private readonly repository: RarityRepository) {}

  async execute(): Promise<RaritySchema[]> {
    return await this.repository.findAll();
  }
}
