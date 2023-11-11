import {MigrationInterface, QueryRunner} from "typeorm";

export class RemoveWorkspace1666105196740 implements MigrationInterface {
    name = 'RemoveWorkspace1666105196740'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order_entity" DROP CONSTRAINT "FK_49b15d5917e0dd4c2318d5718f9"`);
        await queryRunner.query(`ALTER TABLE "order_entity" DROP CONSTRAINT "FK_8fa373f82d11b4aa4c7479812d6"`);
        await queryRunner.query(`ALTER TABLE "order_entity" DROP COLUMN "workspaceId"`);
        await queryRunner.query(`ALTER TABLE "order_entity" DROP COLUMN "workspaceUserId"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order_entity" ADD "workspaceUserId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order_entity" ADD "workspaceId" integer`);
        await queryRunner.query(`ALTER TABLE "order_entity" ADD CONSTRAINT "FK_8fa373f82d11b4aa4c7479812d6" FOREIGN KEY ("workspaceId") REFERENCES "workspace_entity"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_entity" ADD CONSTRAINT "FK_49b15d5917e0dd4c2318d5718f9" FOREIGN KEY ("workspaceUserId") REFERENCES "workspace_user_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
