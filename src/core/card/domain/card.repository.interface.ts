import { IRepository } from '../../shared/domain/repository';
import { YuGiOhCardSchema } from './card.schema';

export interface ICardRepository extends IRepository {
  searchByName(name: string): Promise<YuGiOhCardSchema[]>;
  parseCards(cards: any[]): YuGiOhCardSchema[];
}
