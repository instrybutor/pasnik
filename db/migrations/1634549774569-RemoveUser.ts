import {MigrationInterface, QueryRunner} from "typeorm";

export class RemoveUser1634549774569 implements MigrationInterface {
    name = 'RemoveUser1634549774569'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "payment_entity" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "balanceCents" integer NOT NULL, "userId" integer, "payerId" integer, CONSTRAINT "PK_6c397c81035bd5b42d16ef3bc70" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "transfer_entity" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "amountCents" integer NOT NULL, "status" integer NOT NULL DEFAULT '0', "fromId" integer, "toId" integer, CONSTRAINT "PK_67ab0757e7db08aed34d7ddf242" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "payment_entity" ADD CONSTRAINT "FK_5fd2756650ddadbc8c96be6106a" FOREIGN KEY ("userId") REFERENCES "user_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "payment_entity" ADD CONSTRAINT "FK_41c0d18a898448bf5c9d22eb7ca" FOREIGN KEY ("payerId") REFERENCES "user_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transfer_entity" ADD CONSTRAINT "FK_cd71c7e00f451e0a6a2a7c984be" FOREIGN KEY ("fromId") REFERENCES "user_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transfer_entity" ADD CONSTRAINT "FK_c794535489df62ffd5d3a2d5b56" FOREIGN KEY ("toId") REFERENCES "user_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transfer_entity" DROP CONSTRAINT "FK_c794535489df62ffd5d3a2d5b56"`);
        await queryRunner.query(`ALTER TABLE "transfer_entity" DROP CONSTRAINT "FK_cd71c7e00f451e0a6a2a7c984be"`);
        await queryRunner.query(`ALTER TABLE "payment_entity" DROP CONSTRAINT "FK_41c0d18a898448bf5c9d22eb7ca"`);
        await queryRunner.query(`ALTER TABLE "payment_entity" DROP CONSTRAINT "FK_5fd2756650ddadbc8c96be6106a"`);
        await queryRunner.query(`DROP TABLE "transfer_entity"`);
        await queryRunner.query(`DROP TABLE "payment_entity"`);
    }

}
