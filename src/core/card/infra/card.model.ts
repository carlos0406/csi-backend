import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('yu_gi_oh_card')
export class YuGiOhCardModel {
  @PrimaryColumn('integer')
  id: number;

  @Column('varchar')
  name: string;

  @Column('simple-array')
  card_sets: string[];

  @Column('varchar')
  image_url: string;

  @Column('varchar')
  image_url_small: string;

  @Column('varchar')
  image_url_cropped: string;
}
