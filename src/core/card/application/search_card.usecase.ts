import { YuGiOhCardSchema } from '../domain/card.schema';
import { ICardRepository } from '../domain/card.repository.interface';

export class SearchCardUsecase {
  constructor(private readonly repository: ICardRepository) {}

  async execute(name: string): Promise<YuGiOhCardSchema[]> {
    return await this.repository.searchByName(name);
  }
}
