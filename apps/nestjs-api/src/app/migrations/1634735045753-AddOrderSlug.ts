import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddOrderSlug1634735045753 implements MigrationInterface {
  name = 'AddOrderSlug1634735045753';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "order_entity" ADD "slug" character varying`
    );
    await queryRunner.query(
      `ALTER TABLE "dish_entity" DROP CONSTRAINT "FK_9706674ad9c7fc5160414903c46"`
    );
    await queryRunner.query(
      `ALTER TABLE "dish_entity" ALTER COLUMN "userId" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "dish_entity" ADD CONSTRAINT "FK_9706674ad9c7fc5160414903c46" FOREIGN KEY ("userId") REFERENCES "user_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );

    await queryRunner.query(`UPDATE "order_entity" SET "slug" = "id"`);
    await queryRunner.query(
      `ALTER TABLE "order_entity" ALTER COLUMN "slug" SET NOT NULL`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "dish_entity" DROP CONSTRAINT "FK_9706674ad9c7fc5160414903c46"`
    );
    await queryRunner.query(
      `ALTER TABLE "dish_entity" ALTER COLUMN "userId" SET NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "dish_entity" ADD CONSTRAINT "FK_9706674ad9c7fc5160414903c46" FOREIGN KEY ("userId") REFERENCES "user_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(`ALTER TABLE "order_entity" DROP COLUMN "slug"`);
  }
}
