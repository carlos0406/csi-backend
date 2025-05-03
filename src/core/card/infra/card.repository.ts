import { Repository } from 'typeorm';
import { YuGiOhCardModel } from './card.model';
import { ILike } from 'typeorm';
import { yugiohcardSchema, YuGiOhCardSchema } from '../domain/card.schema';

export class CardRepository {
  constructor(private readonly repository: Repository<YuGiOhCardModel>) {}
  async searchByName(name: string): Promise<YuGiOhCardSchema[]> {
    return this.parseCards(
      await this.repository.find({
        where: { name: ILike(`%${name}%`) },
        take: 25,
      }),
    );
  }

  parseCards(cards: YuGiOhCardModel[]) {
    try {
      return cards.map((card) => yugiohcardSchema.parse(card));
    } catch (error) {
      throw new Error(`Error parsing cards: ${error}`);
    }
  }
}
