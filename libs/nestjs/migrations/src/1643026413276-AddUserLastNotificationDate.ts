import {MigrationInterface, QueryRunner} from "typeorm";

export class AddUserLastNotificationDate1643026413276 implements MigrationInterface {
    name = 'AddUserLastNotificationDate1643026413276'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_entity" DROP COLUMN "lastNotificationDate"`);
        await queryRunner.query(`ALTER TABLE "user_entity" ADD "lastNotificationDate" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_entity" DROP COLUMN "lastNotificationDate"`);
        await queryRunner.query(`ALTER TABLE "user_entity" ADD "lastNotificationDate" character varying`);
    }

}
