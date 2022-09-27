import {MigrationInterface, QueryRunner} from "typeorm";

export class Pay1659513416146 implements MigrationInterface {
    name = 'Pay1659513416146'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "operation_entity" DROP CONSTRAINT "FK_6e0db696b0428a36ea574b973f2"`);
        await queryRunner.query(`ALTER TABLE "operation_entity" ALTER COLUMN "workspaceId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "operation_entity" ADD CONSTRAINT "FK_6e0db696b0428a36ea574b973f2" FOREIGN KEY ("workspaceId") REFERENCES "workspace_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "operation_entity" DROP CONSTRAINT "FK_6e0db696b0428a36ea574b973f2"`);
        await queryRunner.query(`ALTER TABLE "operation_entity" ALTER COLUMN "workspaceId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "operation_entity" ADD CONSTRAINT "FK_6e0db696b0428a36ea574b973f2" FOREIGN KEY ("workspaceId") REFERENCES "workspace_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
