import {MigrationInterface, QueryRunner} from "typeorm";

export class Pay1659513379822 implements MigrationInterface {
    name = 'Pay1659513379822'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order_entity" DROP CONSTRAINT "FK_8fa373f82d11b4aa4c7479812d6"`);
        await queryRunner.query(`ALTER TABLE "order_entity" ALTER COLUMN "workspaceId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order_entity" ADD CONSTRAINT "FK_8fa373f82d11b4aa4c7479812d6" FOREIGN KEY ("workspaceId") REFERENCES "workspace_entity"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order_entity" DROP CONSTRAINT "FK_8fa373f82d11b4aa4c7479812d6"`);
        await queryRunner.query(`ALTER TABLE "order_entity" ALTER COLUMN "workspaceId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order_entity" ADD CONSTRAINT "FK_8fa373f82d11b4aa4c7479812d6" FOREIGN KEY ("workspaceId") REFERENCES "workspace_entity"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
