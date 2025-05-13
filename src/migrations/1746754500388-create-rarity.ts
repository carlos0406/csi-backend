import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateRarity1746754500388 implements MigrationInterface {
  name = 'CreateRarity1746754500388';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "rarity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying, CONSTRAINT "PK_abfb3052bad892c356e54679f8f" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "rarity"`);
  }
}
