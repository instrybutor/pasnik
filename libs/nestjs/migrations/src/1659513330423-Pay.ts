import {MigrationInterface, QueryRunner} from "typeorm";

export class Pay1659513330423 implements MigrationInterface {
    name = 'Pay1659513330423'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order_entity" DROP CONSTRAINT "FK_d511a6a76ea9650b6c321aa4685"`);
        await queryRunner.query(`ALTER TABLE "order_entity" ALTER COLUMN "operationId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order_entity" ADD CONSTRAINT "FK_d511a6a76ea9650b6c321aa4685" FOREIGN KEY ("operationId") REFERENCES "operation_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order_entity" DROP CONSTRAINT "FK_d511a6a76ea9650b6c321aa4685"`);
        await queryRunner.query(`ALTER TABLE "order_entity" ALTER COLUMN "operationId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order_entity" ADD CONSTRAINT "FK_d511a6a76ea9650b6c321aa4685" FOREIGN KEY ("operationId") REFERENCES "operation_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
