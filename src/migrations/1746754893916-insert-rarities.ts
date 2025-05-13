import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertRarities1746754893916 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.insert('rarity', [
      // Common rarities
      { name: 'Box' },
      { name: 'Common' },
      { name: 'Collector Rare' },
      { name: 'Ghost Rare' },
      { name: 'Ultimate Rare' },
      { name: 'Premium Gold Rare' },
      { name: 'Pharaohs Rare' },
      { name: 'Prismatic Secret Rare' },
      { name: 'Platinum Secret Rare' },
      { name: 'Quarter Century Secret Rare' },
      { name: 'Rare' },
      { name: 'Starlight Rare' },
      { name: 'Super Rare' },
      { name: 'Secret Rare' },
      { name: 'Ultra Parallel Rare' },
      { name: 'Ultra Rare' },
      { name: 'Star Foil' },
      { name: 'Ghost Gold Rare' },
      { name: 'Gold Rare' },
      { name: 'Shatterfoil' },
      { name: 'Platinum' },
      { name: 'Mosaic Rare' },
      { name: 'Gold Secret Rare' },
      { name: 'Duel Terminal' },
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM rarity`);
  }
}
