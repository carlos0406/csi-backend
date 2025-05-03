import { MigrationInterface, QueryRunner } from 'typeorm';

export class DbInit1745633606969 implements MigrationInterface {
  name = 'DbInit1745633606969';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "yu_gi_oh_card" ("id" integer NOT NULL, "name" character varying NOT NULL, "card_sets" text NOT NULL, "image_url" character varying NOT NULL, "image_url_small" character varying NOT NULL, "image_url_cropped" character varying NOT NULL, CONSTRAINT "PK_93b88331dfb992e49af178d39ad" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "users"."users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying, "email" character varying, "emailVerified" character varying, "image" character varying, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "users"."accounts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" uuid NOT NULL, "type" character varying NOT NULL, "provider" character varying NOT NULL, "providerAccountId" character varying NOT NULL, "refresh_token" character varying, "access_token" character varying, "expires_at" bigint, "token_type" character varying, "scope" character varying, "id_token" character varying, "session_state" character varying, CONSTRAINT "PK_5a7a02c20412299d198e097a8fe" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "users"."sessions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "sessionToken" character varying NOT NULL, "userId" uuid NOT NULL, "expires" character varying NOT NULL, CONSTRAINT "UQ_8b5e2ec52e335c0fe16d7ec3584" UNIQUE ("sessionToken"), CONSTRAINT "PK_3238ef96f18b355b671619111bc" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "users"."verification_tokens" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "token" character varying NOT NULL, "identifier" character varying NOT NULL, "expires" character varying NOT NULL, CONSTRAINT "PK_f2d4d7a2aa57ef199e61567db22" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "purchases" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255) NOT NULL, "startDate" TIMESTAMP NOT NULL, "endDate" TIMESTAMP NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "created_by" uuid NOT NULL, CONSTRAINT "PK_1d55032f37a34c6eceacbbca6b8" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "shopping_lists" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" uuid NOT NULL, "purchaseId" uuid NOT NULL, CONSTRAINT "PK_9289ace7dd5e768d65290f3f9de" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "shopping_list_items" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "shoppingListId" uuid NOT NULL, "cardId" integer NOT NULL, "rarity" character varying(50) NOT NULL, "collection" character varying(100) NOT NULL, "quantity" integer NOT NULL, "unit_price" integer NOT NULL DEFAULT '0', CONSTRAINT "PK_043c112c02fdc1c39fbd619fadb" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "users"."accounts" ADD CONSTRAINT "FK_3aa23c0a6d107393e8b40e3e2a6" FOREIGN KEY ("userId") REFERENCES "users"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "users"."sessions" ADD CONSTRAINT "FK_57de40bc620f456c7311aa3a1e6" FOREIGN KEY ("userId") REFERENCES "users"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "purchases" ADD CONSTRAINT "FK_70ebb313de49b0256d21b1527d4" FOREIGN KEY ("created_by") REFERENCES "users"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "shopping_lists" ADD CONSTRAINT "FK_5b9bb541ecf94396d2078d96df8" FOREIGN KEY ("userId") REFERENCES "users"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "shopping_lists" ADD CONSTRAINT "FK_3d0fb29ddd2e198ff4f721a20a0" FOREIGN KEY ("purchaseId") REFERENCES "purchases"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "shopping_list_items" ADD CONSTRAINT "FK_268e82a2d60e718cbaf8354a0f8" FOREIGN KEY ("shoppingListId") REFERENCES "shopping_lists"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "shopping_list_items" ADD CONSTRAINT "FK_b3877ad15644486f24d3b45b21a" FOREIGN KEY ("cardId") REFERENCES "yu_gi_oh_card"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "shopping_list_items" DROP CONSTRAINT "FK_b3877ad15644486f24d3b45b21a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "shopping_list_items" DROP CONSTRAINT "FK_268e82a2d60e718cbaf8354a0f8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "shopping_lists" DROP CONSTRAINT "FK_3d0fb29ddd2e198ff4f721a20a0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "shopping_lists" DROP CONSTRAINT "FK_5b9bb541ecf94396d2078d96df8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "purchases" DROP CONSTRAINT "FK_70ebb313de49b0256d21b1527d4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users"."sessions" DROP CONSTRAINT "FK_57de40bc620f456c7311aa3a1e6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users"."accounts" DROP CONSTRAINT "FK_3aa23c0a6d107393e8b40e3e2a6"`,
    );
    await queryRunner.query(`DROP TABLE "shopping_list_items"`);
    await queryRunner.query(`DROP TABLE "shopping_lists"`);
    await queryRunner.query(`DROP TABLE "purchases"`);
    await queryRunner.query(`DROP TABLE "users"."verification_tokens"`);
    await queryRunner.query(`DROP TABLE "users"."sessions"`);
    await queryRunner.query(`DROP TABLE "users"."accounts"`);
    await queryRunner.query(`DROP TABLE "users"."users"`);
    await queryRunner.query(`DROP TABLE "yu_gi_oh_card"`);
  }
}
