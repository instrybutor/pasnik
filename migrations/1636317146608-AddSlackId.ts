import {MigrationInterface, QueryRunner} from "typeorm";

export class AddSlackId1636317146608 implements MigrationInterface {
    name = 'AddSlackId1636317146608'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_entity" ADD "slackId" character varying`);
        await queryRunner.query(`ALTER TABLE "user_entity" ALTER COLUMN "googleId" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_entity" ALTER COLUMN "googleId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_entity" DROP COLUMN "slackId"`);
    }

}
