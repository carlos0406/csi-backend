import { MigrationInterface, QueryRunner } from 'typeorm';

export class UseRarity1746848393655 implements MigrationInterface {
  name = 'UseRarity1746848393655';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "shopping_list_items" RENAME COLUMN "rarity" TO "rarityId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "shopping_list_items" DROP COLUMN "rarityId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "shopping_list_items" ADD "rarityId" uuid NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "shopping_list_items" ADD CONSTRAINT "FK_48522115d59357dad2377577489" FOREIGN KEY ("rarityId") REFERENCES "rarity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "shopping_list_items" DROP CONSTRAINT "FK_48522115d59357dad2377577489"`,
    );
    await queryRunner.query(
      `ALTER TABLE "shopping_list_items" DROP COLUMN "rarityId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "shopping_list_items" ADD "rarityId" character varying(50) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "shopping_list_items" RENAME COLUMN "rarityId" TO "rarity"`,
    );
  }
}
