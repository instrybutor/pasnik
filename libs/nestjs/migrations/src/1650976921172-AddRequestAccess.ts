import {MigrationInterface, QueryRunner} from "typeorm";

export class AddRequestAccess1650976921172 implements MigrationInterface {
    name = 'AddRequestAccess1650976921172'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "workspace_access_request_entity" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer NOT NULL, "status" character varying NOT NULL, "workspaceId" integer, CONSTRAINT "PK_04c9b6a71a18dddf01d7207f1c1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "order_entity" DROP CONSTRAINT "FK_c8ab590f1e10afcf1637e71a71e"`);
        await queryRunner.query(`ALTER TABLE "order_entity" ALTER COLUMN "userId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "dish_entity" DROP CONSTRAINT "FK_9706674ad9c7fc5160414903c46"`);
        await queryRunner.query(`ALTER TABLE "dish_entity" ALTER COLUMN "userId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order_entity" ADD CONSTRAINT "FK_c8ab590f1e10afcf1637e71a71e" FOREIGN KEY ("userId") REFERENCES "user_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "dish_entity" ADD CONSTRAINT "FK_9706674ad9c7fc5160414903c46" FOREIGN KEY ("userId") REFERENCES "user_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "workspace_access_request_entity" ADD CONSTRAINT "FK_45e1a371d5b7372e3c4b0e0e366" FOREIGN KEY ("workspaceId") REFERENCES "workspace_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "workspace_access_request_entity" ADD CONSTRAINT "FK_8b665d240f7a430dadcc70957ad" FOREIGN KEY ("userId") REFERENCES "user_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "workspace_access_request_entity" DROP CONSTRAINT "FK_8b665d240f7a430dadcc70957ad"`);
        await queryRunner.query(`ALTER TABLE "workspace_access_request_entity" DROP CONSTRAINT "FK_45e1a371d5b7372e3c4b0e0e366"`);
        await queryRunner.query(`ALTER TABLE "dish_entity" DROP CONSTRAINT "FK_9706674ad9c7fc5160414903c46"`);
        await queryRunner.query(`ALTER TABLE "order_entity" DROP CONSTRAINT "FK_c8ab590f1e10afcf1637e71a71e"`);
        await queryRunner.query(`ALTER TABLE "dish_entity" ALTER COLUMN "userId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "dish_entity" ADD CONSTRAINT "FK_9706674ad9c7fc5160414903c46" FOREIGN KEY ("userId") REFERENCES "user_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_entity" ALTER COLUMN "userId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order_entity" ADD CONSTRAINT "FK_c8ab590f1e10afcf1637e71a71e" FOREIGN KEY ("userId") REFERENCES "user_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`DROP TABLE "workspace_access_request_entity"`);
    }

}
