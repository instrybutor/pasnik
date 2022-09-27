import {MigrationInterface, QueryRunner} from "typeorm";

export class Pay1659513138859 implements MigrationInterface {
    name = 'Pay1659513138859'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "balance_entity" ADD CONSTRAINT "UQ_ec235fd9c113e4c5667c2c34b14" UNIQUE ("workspaceUserId")`);
        await queryRunner.query(`ALTER TABLE "order_entity" ADD CONSTRAINT "UQ_d511a6a76ea9650b6c321aa4685" UNIQUE ("operationId")`);
        await queryRunner.query(`ALTER TABLE "order_entity" ADD CONSTRAINT "FK_d511a6a76ea9650b6c321aa4685" FOREIGN KEY ("operationId") REFERENCES "operation_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order_entity" DROP CONSTRAINT "FK_d511a6a76ea9650b6c321aa4685"`);
        await queryRunner.query(`ALTER TABLE "order_entity" DROP CONSTRAINT "UQ_d511a6a76ea9650b6c321aa4685"`);
        await queryRunner.query(`ALTER TABLE "balance_entity" DROP CONSTRAINT "UQ_ec235fd9c113e4c5667c2c34b14"`);
    }

}
