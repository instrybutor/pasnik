import {MigrationInterface, QueryRunner} from "typeorm";

export class Elo1637231458735 implements MigrationInterface {
    name = 'Elo1637231458735'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "dish_entity" ADD "elo" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "dish_entity" DROP COLUMN "elo"`);
    }

}
