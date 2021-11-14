import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateDatabase1635148668945 implements MigrationInterface {
    name = 'CreateDatabase1635148668945'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_entity" ("id" SERIAL NOT NULL, "givenName" character varying, "familyName" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "googleId" character varying NOT NULL, "email" character varying NOT NULL, "avatarImg" character varying, "isAdmin" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_b54f8ea623b17094db7667d8206" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "order_action_entity" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "action" character varying NOT NULL, "userId" integer, "orderId" uuid, "actionUserId" integer, CONSTRAINT "PK_4238cd67733bf6a02162b5dfe22" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "order_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "slug" character varying NOT NULL, "status" character varying NOT NULL DEFAULT 'in-progress', "from" character varying, "menuUrl" character varying NOT NULL, "shippingCents" integer NOT NULL DEFAULT '0', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "orderedAt" TIMESTAMP WITH TIME ZONE, "deliveredAt" TIMESTAMP WITH TIME ZONE, "totalPrice" integer NOT NULL DEFAULT '0', "userId" integer, "payerId" integer, CONSTRAINT "PK_428b558237e70f2cd8462e1bea1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "dish_entity" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "priceCents" integer NOT NULL, "orderId" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "PK_730f91c7c494655cc12c11d8a28" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "invitation_entity" ("email" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "status" character varying NOT NULL, "changedById" integer, "userId" integer, CONSTRAINT "PK_fb6c8a09b61a03ac00753ca86ad" PRIMARY KEY ("email"))`);
        await queryRunner.query(`CREATE TABLE "payment_entity" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "balanceCents" integer NOT NULL, "userId" integer, "payerId" integer, CONSTRAINT "PK_6c397c81035bd5b42d16ef3bc70" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "transfer_entity" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "amountCents" integer NOT NULL, "status" integer NOT NULL DEFAULT '0', "fromId" integer, "toId" integer, CONSTRAINT "PK_67ab0757e7db08aed34d7ddf242" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "order_action_entity" ADD CONSTRAINT "FK_d72fff3a01e856b40fa8ad4d445" FOREIGN KEY ("userId") REFERENCES "user_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_action_entity" ADD CONSTRAINT "FK_ec8e7631f303b82f09e24482045" FOREIGN KEY ("orderId") REFERENCES "order_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_action_entity" ADD CONSTRAINT "FK_754af5cc9ec7b58bc97ba0e798a" FOREIGN KEY ("actionUserId") REFERENCES "user_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_entity" ADD CONSTRAINT "FK_c8ab590f1e10afcf1637e71a71e" FOREIGN KEY ("userId") REFERENCES "user_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_entity" ADD CONSTRAINT "FK_21b36704ab8da70dac7ff5ea470" FOREIGN KEY ("payerId") REFERENCES "user_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "dish_entity" ADD CONSTRAINT "FK_41d7e35887887e3cc828f854c79" FOREIGN KEY ("orderId") REFERENCES "order_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "dish_entity" ADD CONSTRAINT "FK_9706674ad9c7fc5160414903c46" FOREIGN KEY ("userId") REFERENCES "user_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "invitation_entity" ADD CONSTRAINT "FK_40a2d20a2648d6cfe05108b98e5" FOREIGN KEY ("changedById") REFERENCES "user_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "invitation_entity" ADD CONSTRAINT "FK_d87712458657a11e7b90d9e9faa" FOREIGN KEY ("userId") REFERENCES "user_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
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
        await queryRunner.query(`ALTER TABLE "invitation_entity" DROP CONSTRAINT "FK_d87712458657a11e7b90d9e9faa"`);
        await queryRunner.query(`ALTER TABLE "invitation_entity" DROP CONSTRAINT "FK_40a2d20a2648d6cfe05108b98e5"`);
        await queryRunner.query(`ALTER TABLE "dish_entity" DROP CONSTRAINT "FK_9706674ad9c7fc5160414903c46"`);
        await queryRunner.query(`ALTER TABLE "dish_entity" DROP CONSTRAINT "FK_41d7e35887887e3cc828f854c79"`);
        await queryRunner.query(`ALTER TABLE "order_entity" DROP CONSTRAINT "FK_21b36704ab8da70dac7ff5ea470"`);
        await queryRunner.query(`ALTER TABLE "order_entity" DROP CONSTRAINT "FK_c8ab590f1e10afcf1637e71a71e"`);
        await queryRunner.query(`ALTER TABLE "order_action_entity" DROP CONSTRAINT "FK_754af5cc9ec7b58bc97ba0e798a"`);
        await queryRunner.query(`ALTER TABLE "order_action_entity" DROP CONSTRAINT "FK_ec8e7631f303b82f09e24482045"`);
        await queryRunner.query(`ALTER TABLE "order_action_entity" DROP CONSTRAINT "FK_d72fff3a01e856b40fa8ad4d445"`);
        await queryRunner.query(`DROP TABLE "transfer_entity"`);
        await queryRunner.query(`DROP TABLE "payment_entity"`);
        await queryRunner.query(`DROP TABLE "invitation_entity"`);
        await queryRunner.query(`DROP TABLE "dish_entity"`);
        await queryRunner.query(`DROP TABLE "order_entity"`);
        await queryRunner.query(`DROP TABLE "order_action_entity"`);
        await queryRunner.query(`DROP TABLE "user_entity"`);
    }

}
