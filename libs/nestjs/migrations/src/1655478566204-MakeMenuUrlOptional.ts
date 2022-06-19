import {MigrationInterface, QueryRunner} from "typeorm";

export class MakeMenuUrlOptional1655478566204 implements MigrationInterface {
    name = 'MakeMenuUrlOptional1655478566204'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order_entity" ALTER COLUMN "menuUrl" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order_entity" ALTER COLUMN "menuUrl" SET NOT NULL`);
    }

}
