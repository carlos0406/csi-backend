import { ShoppingListInput } from './shopping_list.schema';

export class ShoppingListItemEntity {
  cardId: number;
  rarityId: string;
  quantity: number;
  collection: string;
  unit_price: number;

  constructor(data: {
    cardId: number;
    rarityId: string;
    quantity: number;
    collection: string;
    unit_price: number;
  }) {
    this.cardId = data.cardId;
    this.rarityId = data.rarityId;
    this.quantity = data.quantity;
    this.collection = data.collection;
    this.unit_price = data.unit_price || 0;
  }
}

export class ShoppingListEntity {
  userId: string;
  purchaseId: string;
  items: ShoppingListItemEntity[];

  constructor(data: ShoppingListInput) {
    this.userId = data.userId;
    this.purchaseId = data.purchaseId;
    this.items = data.items.map(
      (item) =>
        new ShoppingListItemEntity({
          cardId: item.cardId,
          rarityId: item.rarityId,
          quantity: item.quantity,
          collection: item.collection,
          unit_price: item.unit_price,
        }),
    );
  }
}
