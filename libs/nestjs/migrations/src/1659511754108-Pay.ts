import {MigrationInterface, QueryRunner} from "typeorm";

export class Pay1659511754108 implements MigrationInterface {
    name = 'Pay1659511754108'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payment_entity" DROP CONSTRAINT "FK_5fd2756650ddadbc8c96be6106a"`);
        await queryRunner.query(`ALTER TABLE "payment_entity" DROP CONSTRAINT "FK_41c0d18a898448bf5c9d22eb7ca"`);
        await queryRunner.query(`ALTER TABLE "order_entity" DROP CONSTRAINT "FK_21b36704ab8da70dac7ff5ea470"`);
        await queryRunner.query(`ALTER TABLE "order_entity" DROP CONSTRAINT "FK_c8ab590f1e10afcf1637e71a71e"`);
        await queryRunner.query(`ALTER TABLE "dish_entity" DROP CONSTRAINT "FK_dc9db9fd3f6328cdd3da7d6ba39"`);
        await queryRunner.query(`ALTER TABLE "dish_entity" DROP CONSTRAINT "FK_9706674ad9c7fc5160414903c46"`);
        await queryRunner.query(`CREATE TABLE "balance_entity" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "workspaceUserId" integer NOT NULL, "balanceCents" integer NOT NULL, CONSTRAINT "UQ_ec235fd9c113e4c5667c2c34b14" UNIQUE ("workspaceUserId"), CONSTRAINT "PK_ec235fd9c113e4c5667c2c34b14" PRIMARY KEY ("workspaceUserId"))`);
        await queryRunner.query(`CREATE TABLE "share_entity" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "workspaceUserId" integer NOT NULL, "share" integer NOT NULL, "shareType" character varying NOT NULL, "expenseId" integer, CONSTRAINT "PK_1060034b427beed9104155ba728" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "expense_entity" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "workspaceUserId" integer NOT NULL, "priceCents" integer NOT NULL, "name" character varying NOT NULL, "operationId" integer NOT NULL, CONSTRAINT "PK_925dcb90c5f37e7ee13141379fa" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "operation_entity" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "priceCents" integer NOT NULL DEFAULT '-1', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "workspaceUserId" integer NOT NULL, "workspaceId" integer NOT NULL, CONSTRAINT "PK_926dbec3380e83643b464d67817" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "payment_entity" DROP COLUMN "balanceCents"`);
        await queryRunner.query(`ALTER TABLE "payment_entity" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "payment_entity" DROP COLUMN "payerId"`);
        await queryRunner.query(`ALTER TABLE "order_entity" DROP COLUMN "from"`);
        await queryRunner.query(`ALTER TABLE "order_entity" DROP COLUMN "totalPrice"`);
        await queryRunner.query(`ALTER TABLE "order_entity" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "order_entity" DROP COLUMN "payerId"`);
        await queryRunner.query(`ALTER TABLE "dish_entity" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "dish_entity" DROP COLUMN "priceCents"`);
        await queryRunner.query(`ALTER TABLE "dish_entity" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "dish_entity" DROP COLUMN "createdById"`);
        await queryRunner.query(`ALTER TABLE "payment_entity" ADD "workspaceUserId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "payment_entity" ADD "amountCents" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "payment_entity" ADD "operationId" integer`);
        await queryRunner.query(`ALTER TABLE "order_entity" ADD "workspaceUserId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order_entity" ADD "operationId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "dish_entity" ADD "expenseId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "dish_entity" ADD CONSTRAINT "UQ_f5f1ab9f33cfa1c4bf345d19a6f" UNIQUE ("expenseId")`);
        await queryRunner.query(`ALTER TABLE "share_entity" ADD CONSTRAINT "FK_cf22d26ea94ea31e3656715c786" FOREIGN KEY ("workspaceUserId") REFERENCES "workspace_user_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "share_entity" ADD CONSTRAINT "FK_1f5433c1048926fb31f4414aa08" FOREIGN KEY ("expenseId") REFERENCES "expense_entity"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "expense_entity" ADD CONSTRAINT "FK_57734e6efbb96309ce7c169b8cc" FOREIGN KEY ("workspaceUserId") REFERENCES "workspace_user_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "expense_entity" ADD CONSTRAINT "FK_697e506b1d265d0ad597ba6ae6f" FOREIGN KEY ("operationId") REFERENCES "operation_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "payment_entity" ADD CONSTRAINT "FK_f44d6d397c20d80a433c0ae47ce" FOREIGN KEY ("workspaceUserId") REFERENCES "workspace_user_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "payment_entity" ADD CONSTRAINT "FK_f1a6facf8dd6e1743ac0936b8f4" FOREIGN KEY ("operationId") REFERENCES "operation_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "operation_entity" ADD CONSTRAINT "FK_d8fdc9597ab149e2ffa82c9dc53" FOREIGN KEY ("workspaceUserId") REFERENCES "workspace_user_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "operation_entity" ADD CONSTRAINT "FK_6e0db696b0428a36ea574b973f2" FOREIGN KEY ("workspaceId") REFERENCES "workspace_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_entity" ADD CONSTRAINT "FK_49b15d5917e0dd4c2318d5718f9" FOREIGN KEY ("workspaceUserId") REFERENCES "workspace_user_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "dish_entity" ADD CONSTRAINT "FK_f5f1ab9f33cfa1c4bf345d19a6f" FOREIGN KEY ("expenseId") REFERENCES "expense_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "dish_entity" DROP CONSTRAINT "FK_f5f1ab9f33cfa1c4bf345d19a6f"`);
        await queryRunner.query(`ALTER TABLE "order_entity" DROP CONSTRAINT "FK_49b15d5917e0dd4c2318d5718f9"`);
        await queryRunner.query(`ALTER TABLE "operation_entity" DROP CONSTRAINT "FK_6e0db696b0428a36ea574b973f2"`);
        await queryRunner.query(`ALTER TABLE "operation_entity" DROP CONSTRAINT "FK_d8fdc9597ab149e2ffa82c9dc53"`);
        await queryRunner.query(`ALTER TABLE "payment_entity" DROP CONSTRAINT "FK_f1a6facf8dd6e1743ac0936b8f4"`);
        await queryRunner.query(`ALTER TABLE "payment_entity" DROP CONSTRAINT "FK_f44d6d397c20d80a433c0ae47ce"`);
        await queryRunner.query(`ALTER TABLE "expense_entity" DROP CONSTRAINT "FK_697e506b1d265d0ad597ba6ae6f"`);
        await queryRunner.query(`ALTER TABLE "expense_entity" DROP CONSTRAINT "FK_57734e6efbb96309ce7c169b8cc"`);
        await queryRunner.query(`ALTER TABLE "share_entity" DROP CONSTRAINT "FK_1f5433c1048926fb31f4414aa08"`);
        await queryRunner.query(`ALTER TABLE "share_entity" DROP CONSTRAINT "FK_cf22d26ea94ea31e3656715c786"`);
        await queryRunner.query(`ALTER TABLE "dish_entity" DROP CONSTRAINT "UQ_f5f1ab9f33cfa1c4bf345d19a6f"`);
        await queryRunner.query(`ALTER TABLE "dish_entity" DROP COLUMN "expenseId"`);
        await queryRunner.query(`ALTER TABLE "order_entity" DROP COLUMN "operationId"`);
        await queryRunner.query(`ALTER TABLE "order_entity" DROP COLUMN "workspaceUserId"`);
        await queryRunner.query(`ALTER TABLE "payment_entity" DROP COLUMN "operationId"`);
        await queryRunner.query(`ALTER TABLE "payment_entity" DROP COLUMN "amountCents"`);
        await queryRunner.query(`ALTER TABLE "payment_entity" DROP COLUMN "workspaceUserId"`);
        await queryRunner.query(`ALTER TABLE "dish_entity" ADD "createdById" integer`);
        await queryRunner.query(`ALTER TABLE "dish_entity" ADD "userId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "dish_entity" ADD "priceCents" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "dish_entity" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order_entity" ADD "payerId" integer`);
        await queryRunner.query(`ALTER TABLE "order_entity" ADD "userId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order_entity" ADD "totalPrice" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "order_entity" ADD "from" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "payment_entity" ADD "payerId" integer`);
        await queryRunner.query(`ALTER TABLE "payment_entity" ADD "userId" integer`);
        await queryRunner.query(`ALTER TABLE "payment_entity" ADD "balanceCents" integer NOT NULL`);
        await queryRunner.query(`DROP TABLE "operation_entity"`);
        await queryRunner.query(`DROP TABLE "expense_entity"`);
        await queryRunner.query(`DROP TABLE "share_entity"`);
        await queryRunner.query(`DROP TABLE "balance_entity"`);
        await queryRunner.query(`ALTER TABLE "dish_entity" ADD CONSTRAINT "FK_9706674ad9c7fc5160414903c46" FOREIGN KEY ("userId") REFERENCES "user_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "dish_entity" ADD CONSTRAINT "FK_dc9db9fd3f6328cdd3da7d6ba39" FOREIGN KEY ("createdById") REFERENCES "user_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_entity" ADD CONSTRAINT "FK_c8ab590f1e10afcf1637e71a71e" FOREIGN KEY ("userId") REFERENCES "user_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_entity" ADD CONSTRAINT "FK_21b36704ab8da70dac7ff5ea470" FOREIGN KEY ("payerId") REFERENCES "user_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "payment_entity" ADD CONSTRAINT "FK_41c0d18a898448bf5c9d22eb7ca" FOREIGN KEY ("payerId") REFERENCES "user_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "payment_entity" ADD CONSTRAINT "FK_5fd2756650ddadbc8c96be6106a" FOREIGN KEY ("userId") REFERENCES "user_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
