import { Repository } from 'typeorm';
import {
  ShoppingListItemModel,
  ShoppingListModel,
} from './shopping_list.model';
import {
  ShoppingListInput,
  shoppingListInputSchema,
} from '../domain/shopping_list.schema';

export class ShoppingListRepository {
  constructor(private readonly repository: Repository<ShoppingListModel>) {}

  async create(data: ShoppingListInput) {
    const parsedData = shoppingListInputSchema.parse(data);
    const items = parsedData.items.map(
      (item) =>
        new ShoppingListItemModel({
          cardId: item.cardId,
          rarityId: item.rarityId,
          quantity: item.quantity,
          collection: item.collection,
          unit_price: item.unit_price,
        }),
    );
    const shoppingListEntity = new ShoppingListModel({
      userId: parsedData.userId,
      purchaseId: parsedData.purchaseId,
      items,
    });
    const { id } = await this.repository.save(shoppingListEntity);
    return { id };
  }

  async findByUserId(userId: string) {
    const shoppingLists = await this.repository.find({
      where: { userId },
      relations: ['user', 'purchase'],
      select: {
        purchase: {
          id: true,
          name: true,
          startDate: true,
          endDate: true,
        },
        user: {
          id: true,
          name: true,
          image: true,
        },
      },
    });

    return shoppingLists;
  }

  async findById(id: string) {
    const shoppingList = await this.repository.findOne({
      where: { id },
      relations: [
        'items', // Load shopping_list_items
        'items.card', // Load YuGiOhCardModel for each item
        'purchase.createdBy', // Load the user associated with the purchase
      ],
      select: {
        items: {
          id: true,
          rarity: {
            id: true,
            name: true,
          },
          quantity: true,
          collection: true,
          unit_price: true,
          card: {
            id: true,
            name: true,
          },
        },
        purchase: {
          id: true,
          name: true,
          startDate: true,
          endDate: true,
          createdBy: {
            id: true,
            name: true,
          },
        },
      },
    });

    return shoppingList;
  }

  async listWithCount(purchaseId: string) {
    const shoppingLists = await this.repository.find({
      where: { purchaseId },
      relations: ['items', 'items.card', 'items.rarity', 'purchase'],
    });

    const aggregatedItems = shoppingLists
      .flatMap((list) => list.items)
      .reduce(
        (acc, item) => {
          const key = `${item.cardId}-${item.rarity}-${item.collection}`;
          if (!acc[key]) {
            acc[key] = {
              card: {
                id: item.card.id,
                name: item.card.name,
              },
              rarity: item.rarity,
              collection: item.collection,
              totalQuantity: 0,
            };
          }
          acc[key].totalQuantity += item.quantity;
          return acc;
        },
        {} as Record<
          string,
          {
            card: { id: number; name: string };
            rarity: {
              id: string;
              name: string;
            };
            collection: string;
            totalQuantity: number;
          }
        >,
      );

    const items = Object.values(aggregatedItems).sort(
      (a, b) => a.card.id - b.card.id,
    );
    return {
      purchase: {
        id: purchaseId,
        items,
      },
    };
  }

  async searchByPurchaseId(purchaseId: string) {
    const shoppingLists = await this.repository.find({
      where: { purchaseId },
      relations: ['purchase', 'user'],
      select: {
        id: true,
        purchase: {
          id: true,
          name: true,
          startDate: true,
          endDate: true,
        },
        user: {
          id: true,
          name: true,
          image: true,
        },
      },
    });
    return shoppingLists;
  }
}
