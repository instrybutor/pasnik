import {MigrationInterface, QueryRunner} from "typeorm";

export class OrderActionSort1656609330809 implements MigrationInterface {
    name = 'OrderActionSort1656609330809'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "dish_entity" DROP CONSTRAINT "FK_dc9db9fd3f6328cdd3da7d6ba39"`);
        await queryRunner.query(`ALTER TABLE "dish_entity" ALTER COLUMN "createdById" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "dish_entity" ADD CONSTRAINT "FK_dc9db9fd3f6328cdd3da7d6ba39" FOREIGN KEY ("createdById") REFERENCES "user_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "dish_entity" DROP CONSTRAINT "FK_dc9db9fd3f6328cdd3da7d6ba39"`);
        await queryRunner.query(`ALTER TABLE "dish_entity" ALTER COLUMN "createdById" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "dish_entity" ADD CONSTRAINT "FK_dc9db9fd3f6328cdd3da7d6ba39" FOREIGN KEY ("createdById") REFERENCES "user_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
