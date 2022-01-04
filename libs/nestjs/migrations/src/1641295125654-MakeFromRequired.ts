import {MigrationInterface, QueryRunner} from "typeorm";

export class MakeFromRequired1641295125654 implements MigrationInterface {
    name = 'MakeFromRequired1641295125654'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order_entity" ALTER COLUMN "from" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order_entity" ALTER COLUMN "from" DROP NOT NULL`);
    }

}
