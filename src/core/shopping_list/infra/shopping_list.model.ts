import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { YuGiOhCardModel } from 'src/core/card/infra/card.model';
import { UserEntity } from '../../user/infra/user.model';
import { PurchaseModel } from '../../purchase/infra/purchase.model';
import { RarityModel } from 'src/core/rarity/infra/rarity.model';

@Entity('shopping_lists')
export class ShoppingListModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  userId: string;

  @Column({ type: 'uuid' })
  purchaseId: string;

  @ManyToOne(() => UserEntity, { nullable: false })
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @ManyToOne(() => PurchaseModel, { nullable: false })
  @JoinColumn({ name: 'purchaseId' })
  purchase: PurchaseModel;

  @OneToMany(() => ShoppingListItemModel, (item) => item.shoppingList, {
    cascade: true,
  })
  items: ShoppingListItemModel[];

  constructor(data?: Partial<Omit<ShoppingListModel, 'id'>>) {
    if (data) {
      this.userId = data.userId;
      this.purchaseId = data.purchaseId;
      this.items = data.items || [];
    }
  }
}

@Entity('shopping_list_items')
export class ShoppingListItemModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  shoppingListId: string;

  @Column({ type: 'integer' })
  cardId: number;

  @Column({ type: 'varchar', length: 100 })
  collection: string;

  @ManyToOne(() => RarityModel, { nullable: false })
  @JoinColumn({ name: 'rarityId' })
  rarity: RarityModel;

  @Column({ type: 'uuid' })
  rarityId: string;

  @Column({ type: 'integer' })
  quantity: number;

  @Column({ type: 'integer', default: 0 })
  unit_price: number;

  @ManyToOne(() => ShoppingListModel, (shoppingList) => shoppingList.items, {
    nullable: false,
  })
  @JoinColumn({ name: 'shoppingListId' })
  shoppingList: ShoppingListModel;

  @ManyToOne(() => YuGiOhCardModel, { nullable: false })
  @JoinColumn({ name: 'cardId' })
  card: YuGiOhCardModel;

  constructor(data?: Partial<ShoppingListItemModel>) {
    if (data) {
      this.cardId = data.cardId;
      this.collection = data.collection;
      this.rarityId = data.rarityId;
      this.quantity = data.quantity;
      this.unit_price = data.unit_price || 0;
    }
  }
}
