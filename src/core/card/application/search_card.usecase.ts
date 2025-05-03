import { YuGiOhCardSchema } from '../domain/card.schema';
import { CardRepository } from '../infra/card.repository';

export class SearchCardUsecase {
  constructor(private readonly repository: CardRepository) {}

  async execute(name: string): Promise<YuGiOhCardSchema[]> {
    return await this.repository.searchByName(name);
  }
}
