import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'rarity' })
export class RarityModel {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', nullable: true })
  name!: string | null;
}
