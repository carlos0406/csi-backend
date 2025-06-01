import { RaritySchema } from '../domain/rarity.schema';
import { IRarityRepository } from '../domain/rarity.repository.interface';

export class ListRaritiesUsecase {
  constructor(private readonly repository: IRarityRepository) {}

  async execute(): Promise<RaritySchema[]> {
    return await this.repository.findAll();
  }
}
